const express = require("express");
const app = express();
const database = require("./database");

app.use(express.static("public"));
app.use(express.json());

const { tokenContract, web3 } = require("../contract/Blockchain");
const byteCode = require("../contract/Bytecode");
const contractABI = require("../contract/ContractABI");

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  database
    .query('SELECT * FROM "User" WHERE "userName" = $1', [username])
    .then((result) => {
      if (result.rows.length === 1) {
        const dbPassword = result.rows[0].password;
        console.log(contractABI);
        if (dbPassword === password) {
          const userData = result.rows[0];
          res.json({ success: true, userData });
        } else {
          res.json({ success: false, errorType: "password" });
        }
      } else {
        res.json({ success: false, errorType: "username" });
      }
    })
    .catch((error) => {
      console.error("Database Error: ", error);
      res.json({ success: false });
    });
});

app.post("/signup", (req, res) => {
  const userType = req.body.userType;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  database
    .query('SELECT * FROM "User" WHERE "userName" = $1', [username])
    .then((result) => {
      if (result.rows.length === 1) {
        res.json({ success: false, errorType: "usernameTaken" });
      } else {
        if (userType === "Roles") {
          res.json({ success: false, errorType: "userType" });
        } else if (!username) {
          res.json({ success: false, errorType: "username" });
        } else if (!email) {
          res.json({ success: false, errorType: "email" });
        } else if (!password) {
          res.json({ success: false, errorType: "password" });
        } else if (!confirmPassword) {
          res.json({ success: false, errorType: "confirmPassword" });
        } else if (password !== confirmPassword) {
          res.json({ success: false, errorType: "passwordInconsistency" });
        } else {
          database
            .query(
              'INSERT INTO "User" ("userName", "email", "password", "userType") VALUES ($1, $2, $3, $4) RETURNING *',
              [username, email, password, userType.toLowerCase()]
            )
            .then((result) => {
              res.json({ success: true });
            })
            .catch((error) => {
              console.error("Database Error: ", error);
              res.json({ success: false });
            });
        }
      }
    })
    .catch((error) => {
      console.error("Database Error: ", error);
      res.json({ success: false });
    });
});

app.post("/tokenminting", async (req, res) => {
  const tokenSymbol = req.body.tokenSymbol;
  const numberOfToken = req.body.numberOfToken;

  console.log(tokenSymbol);
  console.log(numberOfToken);

  const tokenName = await database
    .query('SELECT "Name" FROM "Token" where "Symbol" = $1;', [tokenSymbol])
    .then((res) => res.rows[0]);

  if (!tokenSymbol) {
    res.json({ success: false, errorType: "tokenSymbol" });
    console.log("tokenSymbol");
    return;
  } else if (!tokenName) {
    res.json({ success: false, errorType: "tokenName" });
    console.log("tokenName");
    return;
  } else if (!numberOfToken) {
    res.json({ success: false, errorType: "numberOfToken" });
    console.log("numberOfToken");
    return;
  } else if (isNaN(numberOfToken)) {
    res.json({ success: false, errorType: "numberError" });
    console.log("numberError");
    return;
  } else if (numberOfToken > 1000000) {
    res.json({ success: false, errorType: "overNumberError" });
    console.log("numberError");
    return;
  }

  const deployedContract = await tokenContract
    .deploy({
      data: byteCode,
    })
    .send(
      {
        from: "0xd8d53928D79379dFda748e439F16264319EA9765",
        gas: 3000000,
        gasPrice: 20000000000,
      },
      async function (error, transactionHash) {
        if (error) {
          console.error("Error generating transaction hash:", error);
        } else {
          console.log("Transaction hash:", transactionHash);
        }
      }
    )
    .on("error", (error) => {
      console.error("Contract deployment error:", error.message);
      res.json({
        success: false,
        errorType: "deploymentError",
        errorMessage: error.message,
      });
    })
    .on("transactionHash", function (transactionHash) {})
    .on("receipt", async (receipt) => {
      try {
        const contractAddress = receipt.contractAddress;
        console.log("Contract deployed at address: " + contractAddress);
        console.log(receipt);

        // Perform minting operation
        const contractInstance = new web3.eth.Contract(
          contractABI,
          contractAddress
        );
        const mintAmount = numberOfToken; // Specify the amount to mint
        const mintTokenName = "DBX"; // Specify the token name
        await contractInstance.methods.mint(mintTokenName, mintAmount).send({
          from: "0xd8d53928D79379dFda748e439F16264319EA9765",
          gas: 6721975,
          gasPrice: 20000000000,
        });

        // Insert contract address into the database
        await database.query(
          'INSERT INTO "Contract" ("contractID") VALUES ($1);',
          [contractAddress]
        );

        res.json({ success: true });
      } catch (error) {
        console.error("Minting error:", error.message);
        res.json({
          success: false,
          errorType: "mintingError",
          errorMessage: error.message,
        });
      }
    });
});

//View Token
app.get("/viewtoken", async (req, res) => {
  try {
    // Get token symbol from query parameters

    // Fetch the latest contractID from the database
    const result = await database.query('SELECT "contractID" FROM "Contract" ORDER BY "contractID" DESC LIMIT 1;');

    console.log(result.rows);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .send({ status: 404, message: "Contract not found." });
    }

    // Extract the contract address from the query result
    const contractAddress = result.rows[0].contractID;

    // Create a contract instance using the contract address
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Get the account address (you can obtain it from query parameters or use a default one)
    const account = "0xd8d53928D79379dFda748e439F16264319EA9765";
    const tokenSymbol = "DBX";

    const balanceBigInt = await contract.methods
      .getBalance(account, tokenSymbol)
      .call();

    // Convert the balance from BigInt to a string or number
    const balance = balanceBigInt.toString();
    // console.log(contract);
    console.log(balance);

    return res
      .status(200)
      .json({ tokenName: "DBX Token", tokenSymbol: "DBX", balance });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, message: error.message });
  }
});

//Purchase Token
app.post("/purchasetoken", async (req, res) => {
  console.log("Received a purchase token request:", req.body);
  // Extracting data from the request body
  const tokenName = req.body.tokenName;
  const amount = req.body.amount;

  console.log("Token Name:", tokenName);
  console.log("Amount:", amount);

  const validationSymbol = await database
    .query('SELECT "Name" FROM "Token" where "Symbol" = $1;', [tokenName])
    .then((res) => res.rows[0]);

  if (!validationSymbol) {
    res.json({ success: false, errorType: "validationSymbol" });
    console.log("tokenSymbol");
    return;
  } else if (!tokenName) {
    res.json({ success: false, errorType: "tokenName" });
    console.log("tokenName");
    return;
  } else if (!amount) {
    res.json({ success: false, errorType: "amount" });
    console.log("tokenName");
    return;
  }

  // Convert amount to string before passing it to web3.utils.toWei
  const amountString = amount.toString();

  console.log("Amount (String):", amountString);

  try {
    console.log(
      "Calling purchase function with tokenName:",
      tokenName,
      "and amount:",
      amountString
    );
    const result = await database.query('SELECT "contractID" FROM "Contract";');
    const contractAddress = result.rows[0].contractID;
    const contractInstance = new web3.eth.Contract(
      contractABI,
      contractAddress
    );

    // Call the WriteData function on the contract to transfer tokens
    await contractInstance.methods.purchase(tokenName, amount).send({
      from: "0x44d1Bc53C719D984B5aeEeeaFa692F14698639cd", // Replace with the buyer's address
      gas: 6721975,
      gasPrice: 20000000000,
    });

    // If the transaction is successful, record the purchase in the database
    const buyerAddress = "0x44d1Bc53C719D984B5aeEeeaFa692F14698639cd"; // Replace with the actual buyer's address
    await database.query(
      'INSERT INTO "tokenpurchase" (buyer_address, token_name, amount_purchased) VALUES ($1, $2, $3) RETURNING *;',
      [buyerAddress, tokenName, amount]
    );

    console.log("Token purchase successful");

    const balanceInWei = await contractInstance.methods
      .getBalance(buyerAddress, tokenName)
      .call();
    console.log(`Account: ${buyerAddress}  still have: ${balanceInWei} DBX`);

    // You can send a success response back
    res.json({ success: true });
  } catch (error) {
    console.error("Error in /purchasetoken endpoint:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//
app.get("/searchUserID", async (req, res) => {
  try {
    // Get current username
    const userName = req.query.userName;

    // Fetch the userID from the database based on the userName
    const userIdResult = await database.query(
      'SELECT "userID" FROM "User" WHERE "userName"=$1;',
      [userName]
    );

    if (userIdResult.rows.length === 0) {
      return res.status(404).send({ status: 404, message: "User not found." });
    }

    // Extract the userID from the query result
    const currentUserId = userIdResult.rows[0].userID;
    // Generate the next awardID asynchronously
    const nextAwardId = await generateNextAwardIdFromDatabase();

    return res
      .status(200)
      .json({ userId: currentUserId, awardId: nextAwardId });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, message: error.message });
  }
});

//Upload Tender Awards
app.post("/writeData", async (req, res) => {
  console.log("Received a writeData request:", req.body);

  //extract data from req.body
  const userid = req.body.userid;
  const awardid = req.body.awardid;
  const supplierid = req.body.supplierid;
  const awardamount = req.body.awardamount;
  const document = req.body.document;
  const documenthash = req.body.documenthash;

  //fix tokenName to KDX and the spend 1 token per time
  const tokenName = "DBX";
  const amount = "1";
  const financerid = "none";
  const funded_int = "false"; //"False";

  console.log("Quick Check: userid:", userid);
  console.log("awardid:" + awardid);
  console.log("supplierid:" + supplierid);
  console.log("awaramount:" + awardamount);
  console.log("document:" + document);
  console.log("documenthash:" + documenthash);
  console.log("tokenName:" + tokenName);
  console.log("amount:" + amount);
  console.log("funded_int:" + funded_int);

  const useridString = userid.toString();
  // const awardidString = awardid.toString();
  const supplieridString = supplierid.toString();
  const documentString = document.toString();
  const financerIDString = financerid.toString();
  const documenthashString = documenthash.toString();

  const buyerAddress = "0x44d1Bc53C719D984B5aeEeeaFa692F14698639cd";

  console.log("Received a writeData request:", req.body);

  try {
    const result = await database.query('SELECT "contractID" FROM "Contract";');
    const contractAddress = result.rows[0].contractID;
    const contractInstance = new web3.eth.Contract(
      contractABI,
      contractAddress
    );

    try {
      const transactionReceipt = await contractInstance.methods
        .WriteData(
          tokenName,
          amount,
          awardid,
          useridString,
          supplieridString,
          awardamount,
          documenthashString,
          financerIDString,
          funded_int
        )
        .send({
          from: "0x44d1Bc53C719D984B5aeEeeaFa692F14698639cd", //buyer address
          gas: 3000000,
          gasPrice: 20000000000,
        });
      console.log("Transaction Receipt:", transactionReceipt);
    } catch (error) {
      console.error("Error during contract method execution:", error);
    }

    const balanceInWei = await contractInstance.methods
      .getBalance(buyerAddress, tokenName)
      .call();
    console.log(
      `账户 ${buyerAddress} 在 DBX 代币中的余额：${balanceInWei} DBX`
    );

    //console.log("Transaction Receipt:", transactionReceipt);

    await database.query(
      'INSERT INTO "award" (awardid,buyerid,supplierid,awardamount,award_doc_hash,funded_ind,document) VALUES ($1,$2,$3,$4,$5,$6,$7);',
      [
        awardid,
        useridString,
        supplieridString,
        awardamount,
        documenthash,
        funded_int, //funded_intString,
        documentString,
      ]
    );

    res.json({ success: true /*receipt: serializedReceipt */ });
  } catch (error) {
    console.error("Error on write data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//Search Award
app.post("/searchAwardID", async (req, res) => {
  try {
    const awardID = req.body.awardID;
    const result = await database.query(
      'SELECT "awardid", "funded_ind" FROM "award" WHERE "awardid" = $1;',
      [awardID]
    );

    if (result.rows.length > 0) {
      const matchingAwardID = result.rows[0].awardid;
      const fundedInd = result.rows[0].funded_ind;
      console.log("Matching Award ID:", result.rows[0]);
      console.log(result.rows[0].funded_ind);

      if (fundedInd === null || fundedInd === false) {
        // Explicitly set status code to 250 for funded_ind "0"
        console.log("Sending status 250 for funded_ind 0"); // Add console log for debugging
        return res.status(250).send({
          status: 250,
          message: "Matching with the awardID",
          awardID: matchingAwardID,
          fundedInd: fundedInd,
        });
      } else {
        // Use the usual 200 status code for other funded_ind values
        return res.status(200).send({
          status: 200,
          message: "Matching with the awardID",
          awardID: matchingAwardID,
          fundedInd: fundedInd,
        });
      }
    } else {
      console.log("No matching awardID found.");
      // Handle the case where no matching awardID is found, e.g., return an error response
      return res.status(404)
        .send({ status: 404, message: "No matching awardID found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, message: error.message });
  }
});

//Search Award ID
app.get("/fundingStatus", async (req, res) => {
  const awardID = req.query.awardid;
  const result = await database.query(
    'SELECT * FROM "award" WHERE "awardid" = $1;',
    [awardID]
  );

  console.log(awardID);
  console.log(result.rows);

  return res.status(200).send({ status: 200, data: result.rows });
});

//Generate Award ID
async function generateNextAwardIdFromDatabase() {
  // Fetch the latest awardID from the database
  const latestAwardResult = await database.query(
    'SELECT "awardid" FROM "award" ORDER BY "awardid" DESC LIMIT 1;'
  );

  let nextAwardId;

  if (latestAwardResult.rows.length === 0) {
    nextAwardId = 1;
  } else {
    nextAwardId =
      parseInt(latestAwardResult.rows[0].awardid.replace(/^AD0*/, ""), 10) + 1;
  }

  // Format nextAwardId with leading zeros if needed
  const formattedAwardId = `AD${nextAwardId.toString().padStart(3, "0")}`;

  return formattedAwardId;
}

//View Buyer Token
app.get("/viewbuyertoken", async (req, res) => {
  try {
    // Get token symbol from query parameters

    // Fetch the latest contractID from the database
    const result = await database.query('SELECT "contractID" FROM "Contract";');

    console.log(result.rows);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .send({ status: 404, message: "Contract not found." });
    }

    // Extract the contract address from the query result
    const contractAddress = result.rows[0].contractID;

    // Create a contract instance using the contract address
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Get the account address (you can obtain it from query parameters or use a default one)
    const account = "0x44d1Bc53C719D984B5aeEeeaFa692F14698639cd";
    const tokenSymbol = "DBX";

    const balanceBigInt = await contract.methods
      .getBalance(account, tokenSymbol)
      .call();

    // Convert the balance from BigInt to a string or number
    const balance = balanceBigInt.toString();
    console.log(contract);
    console.log(balance);

    return res
      .status(200)
      .json({ tokenName: "DBX Token", tokenSymbol: "DBX", balance });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, message: error.message });
  }
});

//Update Fund Status
app.post("/updateFundStatus", async (req, res) => {
  try {
    const status = req.body.status;
    const awardID = req.body.awardid;
    const financierID = req.body.financierID;

    console.log("Funded Status:", status);
    console.log("Award ID:", awardID);
    console.log("Financier ID:", financierID);

    if (status === true) {
      const result = await database.query(
        'UPDATE "award" SET "funded_ind" =$1, "financierid" =$2 WHERE "awardid" = $3',
        [status, financierID, awardID]
      );
      return res.status(200).send({
        status: 200,
        message: "Update Status Successfully !",
        errorType: "success",
        awardID: awardID,
      });
    } else {
      if (typeof status === 'undefined') {

        return res.status(400).send({ status: 400, message: error.message });
      } else {
        return res.status(250).send({
          status: 250,
          message: "Please use another award ID !",
          errorType: "again",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 400, message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
