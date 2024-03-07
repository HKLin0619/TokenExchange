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
        from: "0x5D9593A19A493264C7BB2d291F30019797C3d049",
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
          from: "0x5D9593A19A493264C7BB2d291F30019797C3d049",
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
      req.query.account || "0x5D9593A19A493264C7BB2d291F30019797C3d049";
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
        from: "0x96F258AAAAF04b1C32530207666C9d3843C41A6A", //
        gas: 3000000,
        gasPrice: 20000000000,
        value: web3.utils.toWei(amountString, "ether"),
      });

    // Log transaction receipt
    console.log("Transaction Receipt:", transactionReceipt);

    // If the transaction is successful, record the purchase in the database
    const buyerAddress = "0x96F258AAAAF04b1C32530207666C9d3843C41A6A"; // Replace with the actual buyer's address
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
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

//Search Award
app.post("/searchaward", async (req, res) => {
  try {
    const awardID = req.body.awardID;
    const result = await database.query('SELECT "awardid" FROM "award" WHERE "awardid" = $1;', [awardID]);

    if (result.rows.length > 0) {
      const matchingAwardID = result.rows[0].awardid;
      console.log("Matching Award ID:", matchingAwardID);
      
      // Redirect to the "/searchawardid" route passing the awardID as a query parameter
      // res.redirect(`/searchawardid?awardID=${matchingAwardID}`);
      return res.status(200).send({ status: 200, message: "Matching with the awardID" });
    } else {
      console.log("No matching awardID found.");
      // Handle the case where no matching awardID is found, e.g., return an error response
      return res.status(404).send({ status: 404, message: "No matching awardID found." });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, message: error.message });
  }
});

app.get("/searchawardid", async (req, res) =>{
  const awardID = req.query.awardid;
  const result = await database.query('SELECT * FROM "award" WHERE "awardid" = $1;', [awardID]);
  
  console.log(awardID);
  console.log(result.rows);

  // Send the fetched data back in the response
  return res.status(200).send({ status: 200, data: result.rows});
});


app.listen(5000, () => {
  console.log("Server started on port 5000");
});
