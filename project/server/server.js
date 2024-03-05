const express = require("express");
const app = express();
const database = require("./database");

app.use(express.static("public"));
app.use(express.json());

const { tokenContract, web3 } = require("../contract/Blockchain");
const byteCode = require("../contract/Bytecode");
const purchaseABI = require("../contract/ContractABI");

// const contractAddress = '0x5FC800309D59224A994235B1c586ef951E7063D2';
// const contract = new web3.eth.Contract(purchaseABI, contractAddress);

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  database
    .query('SELECT * FROM "User" WHERE "userName" = $1', [username])
    .then((result) => {
      if (result.rows.length === 1) {
        const dbPassword = result.rows[0].password;
        console.log(purchaseABI);
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

  console.log("ASDASDASDSAD");
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
        from: "0xc1f57C2eccec2579A6c0Df39dEdF7E119eBAb02C",
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
          purchaseABI,
          contractAddress
        );
        const mintAmount = numberOfToken; // Specify the amount to mint
        const mintTokenName = "KDX"; // Specify the token name
        await contractInstance.methods.mint(mintTokenName, mintAmount).send({
          from: "0xc1f57C2eccec2579A6c0Df39dEdF7E119eBAb02C",
          gas: 3000000,
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
    const contract = new web3.eth.Contract(purchaseABI, contractAddress);

    // Get the account address (you can obtain it from query parameters or use a default one)
    const account =
      req.query.account || "0xc1f57C2eccec2579A6c0Df39dEdF7E119eBAb02C";
    const tokenSymbol = "KDX";

    const balanceBigInt = await contract.methods
      .getBalance(account, tokenSymbol)
      .call();

    // Convert the balance from BigInt to a string or number
    const balance = balanceBigInt.toString();
    console.log(contract);
    console.log(balance);

    return res
      .status(200)
      .json({ tokenName: "KDX Token", tokenSymbol: "KDX", balance });
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
      purchaseABI,
      contractAddress
    );

    // Calling the purchase function on the contract
    const transactionReceipt = await contractInstance.methods
      .purchase(tokenName, amountString)
      .send({
        from: "0xF58f12B4CB6087Dc7a475173FC0Da0eA5c44c0a6", //
        gas: 3000000,
        gasPrice: 20000000000,
        value: web3.utils.toWei(amountString, "ether"),
      });

    // Log transaction receipt
    console.log("Transaction Receipt:", transactionReceipt);

    // If the transaction is successful, record the purchase in the database
    const buyerAddress = "0xF58f12B4CB6087Dc7a475173FC0Da0eA5c44c0a6"; // Replace with the actual buyer's address
    await database.query(
      'INSERT INTO "tokenpurchase" (buyer_address, token_name, amount_purchased) VALUES ($1, $2, $3) RETURNING *;',
      [buyerAddress, tokenName, amount]
    );

    // Convert transactionReceipt values to strings before sending in response
    const serializedReceipt = {
      transactionHash: transactionReceipt.transactionHash,
      blockHash: transactionReceipt.blockHash,
      // Add any other relevant properties here
    };

    // You can handle the receipt or send a response back
    res.json({ success: true, receipt: serializedReceipt });
  } catch (error) {
    // Log more information about the error
    console.error("Error in token purchase:", error);

    // Handle other errors
    // Handle other errors
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

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
  const tokenName = "KDX";
  const amount = "1";
  const financerid = "none";
  const funded_int = "False";

  console.log("Quick Check: userid:", userid);
  console.log("awardid:" + awardid);
  console.log("supplierid:" + supplierid);
  console.log("awaramount:" + awardamount);
  console.log("document:" + document);
  console.log("documenthash:" + documenthash);
  console.log("tokenName:" + tokenName);
  console.log("amount:" + amount);

  const useridString = userid.toString();
  const awardidString = awardid.toString();
  const supplieridString = supplierid.toString();

  try {
    const result = await database.query('SELECT "contractID" FROM "Contract";');
    const contractAddress = result.rows[0].contractID;
    const contractInstance = new web3.eth.Contract(
      purchaseABI,
      contractAddress
    );

    const transactionReceipt = await contractInstance.methods
      .WriteData(
        tokenName,
        amount,
        awardidString,
        useridString,
        supplieridString,
        awardamount,
        documenthash,
        financerid,
        funded_int
      )
      .send({
        from: "0xF58f12B4CB6087Dc7a475173FC0Da0eA5c44c0a6",
        gas: 3000000,
        gasPrice: 20000000000,
        //value: web3.utils.toWei(amount, "ether"),
      });

    console.log("Transaction Receipt:", transactionReceipt);

    const buyerAddress = "0xF58f12B4CB6087Dc7a475173FC0Da0eA5c44c0a6";
    await database.query(
      'INSERT INTO "award" (awardid,buyerid,supplierid,awardamount,award_doc_hash,funded_ind) VALUES ($1,$2,$3,$4,$5,$6);',
      [
        awardidString,
        useridString,
        supplieridString,
        awardamount,
        documenthash,
        funded_int,
      ]
    );

    const serializedReceipt = {
      transactionHash: transactionReceipt.transactionHash,
      blockHash: transactionReceipt.blockHash,
    };

    res.json({ success: true, receipt: serializedReceipt });
  } catch (error) {
    console.error("Error on write data:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

async function generateNextAwardIdFromDatabase() {
  // Fetch the latest awardID from the database
  const latestAwardResult = await database.query(
    'SELECT "awardid" FROM "award" ORDER BY "awardid" DESC LIMIT 1;'
  );

  if (latestAwardResult.rows.length > 0) {
    const awardId = latestAwardResult.rows[0].awardid;
    console.log("awardId:", awardId);
  } else {
    console.log("No award found");
  }

  let nextAwardId;

  if (latestAwardResult.rows.length === 0) {
    // If no previous awardID found, start from 1 or any initial value you prefer
    nextAwardId = 1;
  } else {
    // Increment the latest awardID by 1
    nextAwardId = latestAwardResult.rows[0].awardid + 1;
  }

  return nextAwardId;
}

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
