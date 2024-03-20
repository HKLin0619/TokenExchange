const express = require("express");
const app = express();
const database = require("./database");
const { Web3 } = require("web3"); // Import the Web3 class
const contractABI = require("../Truffle/build/contracts/TokenSaleContract.json");
const { Transaction } = require('ethereumjs-tx');
const privateKey = require('../contract/PrivateKey');
const { Buffer } = require('buffer');
const byteCode = require("../contract/Bytecode");

// Import the Web3 constructor

// Import the network provider from truffle-config.js
const truffleConfig = require('../Truffle/truffle-config');
const networkProvider = truffleConfig.networks.development.provider();

// Create a new instance of Web3 using the provider from truffle-config.js
const web3 = new Web3(networkProvider);

app.use(express.static("public"));
app.use(express.json());

// Add the network configuration check here
web3.eth.net.getId()
  .then((networkId) => {
    console.log("Network ID:", networkId);

    // Extract numeric part from the networkId string
    const numericNetworkId = parseInt(networkId, 10);

    // Check if the numeric part is a valid integer
    if (!isNaN(numericNetworkId)) {
      // Check the network ID against known network IDs
      if (numericNetworkId === 1) {
        console.log("Connected to Ethereum Mainnet");
      } else if (numericNetworkId === 4) {
        console.log("Connected to Rinkeby Testnet");
      } else if (numericNetworkId === 80001) {
        console.log("Connected to Mumbai Testnet");
      } else {
        console.log("Connected to Unknown Network with ID:", numericNetworkId);
      }
    } else {
      console.error("Invalid network ID format:", networkId);
    }
  })
  .catch((error) => {
    console.error("Error retrieving network ID:", error);
  });

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  database
    .query('SELECT * FROM "User" WHERE "userName" = $1', [username])
    .then((result) => {
      if (result.rows.length === 1) {
        const dbPassword = result.rows[0].password;
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


//Token Minting
// app.post("/tokenminting", async (req, res) => {
//   const tokenSymbol = req.body.tokenSymbol;
//   const numberOfToken = req.body.numberOfToken;
//   const ethAddress = req.body.ethereumAddress;

//   console.log(tokenSymbol);
//   console.log(numberOfToken);
//   console.log(ethAddress);

//   const tokenName = await database
//     .query('SELECT "Name" FROM "Token" where "Symbol" = $1;', [tokenSymbol])
//     .then((res) => res.rows[0]);

//   if (!tokenSymbol) {
//     res.json({ success: false, errorType: "tokenSymbol" });
//     console.log("tokenSymbol");
//     return;
//   } else if (!tokenName) {
//     res.json({ success: false, errorType: "tokenName" });
//     console.log("tokenName");
//     return;
//   } else if (!numberOfToken) {
//     res.json({ success: false, errorType: "numberOfToken" });
//     console.log("numberOfToken");
//     return;
//   } else if (isNaN(numberOfToken)) {
//     res.json({ success: false, errorType: "numberError" });
//     console.log("numberError");
//     return;
//   }
//   else if (numberOfToken > 1000000) {
//     res.json({ success: false, errorType: "overNumberError" });
//     console.log("numberError");
//     return;
//   }

//   const deployedContract = await tokenContract
//   .deploy({
//     data: byteCode,
//   })
//   .send({
//     from: ethAddress,
//     gas: 3000000,
//     gasPrice: 20000000000,
//   })
//   .on("error", (error) => {
//     console.error("Contract deployment error:", error.message);
//     res.json({
//       success: false,
//       errorType: "deploymentError",
//       errorMessage: error.message,
//     });
//   })
//   .on("transactionHash", function (transactionHash) {})
//   .on("receipt", async (receipt) => {
//     try {
//       const contractAddress = receipt.contractAddress;
//       console.log("Contract deployed at address: " + contractAddress);
//       console.log(receipt);

//       // Perform minting operation
//       const contractInstance = new web3.eth.Contract(
//         contractABI,
//         contractAddress
//       );
//       const mintAmount = numberOfToken; // Specify the amount to mint
//       const mintTokenName = "DBX"; // Specify the token name
//       await contractInstance.methods.mint(mintTokenName, mintAmount).send({
//         from: ethAddress,
//         gas: 6721975,
//         gasPrice: 20000000000,
//       });
      
//       // Insert contract address into the database
//       await database.query(
//         'INSERT INTO "Contract" ("contractID") VALUES ($1);',
//         [contractAddress]
//       );

//       res.json({ success: true });
//     } catch (error) {
//       console.error("Minting error:", error.message);
//       res.json({
//         success: false,
//         errorType: "mintingError",
//         errorMessage: error.message,
//       });
//     }
//   });
// });

app.post("/tokenminting", async (req, res) => {
  const tokenSymbol = req.body.tokenSymbol;
  const numberOfToken = req.body.numberOfToken;
  const ethAddress = "0x894b5062EdbcEF66F6FcD203CC2B63eB7bA32bB2";

  console.log(tokenSymbol);
  console.log(numberOfToken);
  console.log(ethAddress);
  web3.eth.net.getId().then(console.log);

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

  try {
    // Deploy contract
    const contract = new web3.eth.Contract(contractABI.abi);
    const contractData = contract.deploy({
      data: byteCode,
    }).encodeABI();

    const nonce = await web3.eth.getTransactionCount(ethAddress);
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 3000000; // You may need to adjust this

    const txParams = {
      nonce: web3.utils.toHex(nonce),
      gasPrice: web3.utils.toHex(gasPrice),
      gasLimit: web3.utils.toHex(gasLimit),
      data: contractData,
      from: ethAddress,
    };
    console.log("AAAAAAAAAAAAAAAAAABC")
    console.log(gasPrice);

    const tx = new Transaction(txParams, { chain: 'mainnet', hardfork: 'istanbul' });
    tx.sign(Buffer.from(privateKey, 'hex')); // Using the imported private key here

    const serializedTx = tx.serialize();

    const txHash = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
    console.log('Contract deployed at address:', txHash.contractAddress);

    // Perform minting operation
    const contractInstance = new web3.eth.Contract(
      contractABI.abi,
      txHash.contractAddress
    );

    const mintAmount = numberOfToken;
    const mintTokenName = "DBX"; // Specify the token name
    await contractInstance.methods.mint(mintTokenName, mintAmount).send({
      from: ethAddress,
      gas: 6721975,
      gasPrice: 20000000000,
    });

    // Insert contract address into the database
    await database.query(
      'INSERT INTO "Contract" ("contractID") VALUES ($1);',
      [txHash.contractAddress]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    res.json({
      success: false,
      errorType: "error",
      errorMessage: error.message,
    });
  }
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
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Get the account address (you can obtain it from query parameters or use a default one)
    const account =
      req.query.account || "0x5C244c22379dCf4b7A02546973D42df433A18b06";
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


    // Calling the purchase function on the contract
    const transactionReceipt = await contractInstance.methods
      .purchase(tokenName, amountString)
      .send({
        from: "0xc49C1F24ad9561D6827342F3294eeb7A427D1572", //
        gas: 3000000,
        gasPrice: 20000000000,
        value: web3.utils.toWei(amountString, "ether"),
      });

    // Log transaction receipt
    console.log("Transaction Receipt:", transactionReceipt);

    // If the transaction is successful, record the purchase in the database
    const buyerAddress = "0xc49C1F24ad9561D6827342F3294eeb7A427D1572"; // Replace with the actual buyer's address
    await database.query(
      'INSERT INTO "tokenpurchase" (buyer_address, token_name, amount_purchased) VALUES ($1, $2, $3) RETURNING *;',
      [buyerAddress, tokenName, amount]
    );

    const balanceInWei = await contractInstance.methods
      .getBalance(buyerAddress, tokenName)
      .call();
    console.log(
      `账户 ${buyerAddress} 在 DBX 代币中的余额：${balanceInWei} DBX`
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
  const funded_int = null; //"False";

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
  const awardidString = awardid.toString();
  const supplieridString = supplierid.toString();
  const documentString = document.toString();
  const funded_intString = funded_int.toString();
  const financerIDString = financerid.toString();
  const documenthashString = documenthash.toString();

  const buyerAddress = "0xF67ABBEe6067aB4d0cE66560E8F3399D9C4C95f8";

  try {
    const result = await database.query('SELECT "contractID" FROM "Contract";');
    const contractAddress = result.rows[0].contractID;
    const contractInstance = new web3.eth.Contract(
      contractABI,
      contractAddress
    );

    const balanceInWei = await contractInstance.methods
      .getBalance(buyerAddress, tokenName)
      .call();
    console.log(
      `账户 ${buyerAddress} 在 DBX 代币中的余额：${balanceInWei} DBX`
    );

    try {
      const transactionReceipt = await contractInstance.methods
        .WriteData(
          tokenName,
          amount,
          awardidString,
          useridString,
          supplieridString,
          awardamount,
          documenthashString,
          financerIDString,
          funded_intString
        )
        .send({
          from: "0x7903402c65aA8e880B5903996B8D1F602c408afd", //buyer address
          gas: 3000000,
          gasPrice: 20000000000,
        });

      console.log("Transaction Receipt:", transactionReceipt);
    } catch (error) {
      console.error("Error during contract method execution:", error);
    }

    //console.log("Transaction Receipt:", transactionReceipt);

    await database.query(
      'INSERT INTO "award" (awardid,buyerid,supplierid,awardamount,award_doc_hash,funded_ind,document) VALUES ($1,$2,$3,$4,$5,$6,$7);',
      [
        awardidString,
        useridString,
        supplieridString,
        awardamount,
        documenthash,
        funded_intString,
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
    const result = await database.query('SELECT "awardid", "funded_ind" FROM "award" WHERE "awardid" = $1;', [awardID]);
  

    if (result.rows.length > 0) {
      const matchingAwardID = result.rows[0].awardid;
      const fundedInd = result.rows[0].funded_ind;
      console.log("Matching Award ID:", result.rows[0]);
      console.log(result.rows[0].funded_ind);

      
      if (fundedInd === null) {
        // Explicitly set status code to 250 for funded_ind "0"
        console.log("Sending status 250 for funded_ind 0");  // Add console log for debugging
        return res.status(250).send({ status: 250, message: "Matching with the awardID", awardID: matchingAwardID, fundedInd: fundedInd });
      } else {
        // Use the usual 200 status code for other funded_ind values
        return res.status(200).send({ status: 200, message: "Matching with the awardID", awardID: matchingAwardID, fundedInd: fundedInd });
      }
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


//Search Award ID
app.get("/fundingStatus", async (req, res) => {
  const awardID = req.query.awardid;
  const result = await database.query(
    'SELECT * FROM "award" WHERE "awardid" = $1;',
    [awardID]
  );

  console.log(awardID);
  console.log(result.rows);

  // Send the fetched data back in the response
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
    // If no previous awardID found, start from 1 or any initial value you prefer
    nextAwardId = 1;
  } else {
    // Extract the latest awardID from the query result
    const latestAwardId = latestAwardResult.rows[0].awardid;

    // Increment the latest awardID by 1
    nextAwardId = latestAwardId + 1;
  }

  // Convert nextAwardId to the desired format (e.g., "AD001", "AD002", ...)
  const formattedAwardId = `AD${String(nextAwardId).padStart(3, '0')}`;

  console.log("Next Award ID:", formattedAwardId);

  return formattedAwardId;
}

app.post("/updateFundStatus", async (req, res) => {
  try {

    const status = req.body.status;
    const awardID = req.body.awardid;

    console.log("Funded Status:",status);
    console.log("Award ID:",awardID);

    const result = await database.query('UPDATE "award" SET "funded_ind" =$1 WHERE "awardid" = $2', [status, awardID]);

    return res.status(200).send({ status: 200, message: "Update Status Successfully !", errorType: "success", awardID: awardID});
      
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: 400, message: error.message });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});