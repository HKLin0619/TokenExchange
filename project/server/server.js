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
  }

  const deployedContract = await tokenContract
    .deploy({
      data: byteCode,
    })
    .send(
      {
        from: "0xaCc7C09193Dc0e2c621CE998B01eF9e1a78881b8",
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
          from: "0xaCc7C09193Dc0e2c621CE998B01eF9e1a78881b8",
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
      req.query.account || "0xaCc7C09193Dc0e2c621CE998B01eF9e1a78881b8";
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
app.get("/purchasetoken", async (req, res) => {
  // Extracting data from the request body
  const tokenName = req.body.tokenName;
  const amount = req.body.amount;

  // Assuming you have the contract address from the previous deployment
  const contractAddress = "0x5e582bcc1a2ef3926e3ff3c43722e33d1da00bbd"; // Replace with your actual contract address

  // Constructing the contract instance based on the deployed address
  const deployedContract = new tokenContract(contractAddress);

  try {
    // Calling the purchase function on the contract
    const transactionReceipt = await deployedContract.methods
      .purchase(tokenName, amount)
      .send({
        from: "0xaCc7C09193Dc0e2c621CE998B01eF9e1a78881b8",
        gas: 6721975,
        gasPrice: 20000000000,
        value: amount * 1e18, // Convert amount to wei
      });

    // If the transaction is successful, record the purchase in the database
    const buyerAddress = "0xC8c51FfF37c6F0A4Dd20D81f7fd4AfEE37b8eEca"; // Replace with the actual buyer's address
    await database.query(
      'INSERT INTO "tokenpurchase" (buyer_address, token_name, amount_purchased) VALUES ($1, $2, $3);',
      [buyerAddress, tokenName, amount]
    );

    // You can handle the receipt or send a response back
    res.json({ success: true, receipt: transactionReceipt });
  } catch (error) {
    // Handle errors if the transaction fails
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
