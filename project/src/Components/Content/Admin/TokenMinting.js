import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./TokenMintingStyle.css";

function TokenMinting() {
  const [tokenSymbol, setTokenName] = useState("");
  const [numberOfToken, setNumberOfToken] = useState("");
  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
      
      // Check the network
      window.ethereum.request({ method: 'eth_chainId' })
        .then((chainId) => {
          console.log("Current chainId:", chainId);
          if (chainId === '0x1') {
            console.log("Connected to Ethereum Mainnet");
          } else if (chainId === '0x13881') {
            console.log("Connected to Mumbai Testnet");
          } else {
            console.log("Connected to another network");
          }
        })
        .catch((error) => {
          console.error("Error getting chainId:", error);
        });
    } else {
      console.log("MetaMask is not installed.");
    }
  }, []);

  const handleBack = async () => {
    navigate("/admindashboard");
  };

  const handleSubmit = async () => {
    try {
      // Request access to MetaMask accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Ensure that at least one account is available
      if (accounts.length === 0) {
        throw new Error("No MetaMask accounts available.");
      }

      // Include the MetaMask account address in the request body
      const requestBody = {
        tokenSymbol,
        numberOfToken,
        ethereumAddress: accounts[0], // Include the MetaMask account address
      };

      console.log(requestBody);

      // Make the POST request to the backend
      const response = await fetch("/tokenminting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      console.log(data); // Log the entire data object

      if (data.success) {
        console.log("tokenMintingSuccessfully");
        navigate("/admindashboard?success=true", storedUserData);
      } else {
        // Handle error responses from the backend
        // ...
      }
    } catch (error) {
      // console.error("MetaMask connection error:", error);
      // toast.error("Failed to connect to MetaMask.", {
      //   position: "top-center",
      //   autoClose: 3000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "colored",
      // });
    }
  };

  return (
    <div className="tm-main">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="tm-sub-main">
        <div className="tm-title">
          <h1>Token Minting</h1>
          <div className="tm-underline"></div>
        </div>

        <div className="tm-inputs">
          <div className="tm-input">
            <i className="fa-solid fa-coins" />
            <input
              type="text"
              placeholder="Token Name (ERC20)"
              className="tm-name"
              value={tokenSymbol}
              onChange={(e) => setTokenName(e.target.value)}
            />
          </div>

          <div className="tm-input">
            <i className="fa-solid fa-plus" />
            <input
              type="text"
              placeholder="Number of Tokens"
              className="tm-name"
              value={numberOfToken}
              onChange={(e) => setNumberOfToken(e.target.value)}
            />
          </div>
        </div>

        <button className="tm-btn" onClick={handleSubmit}>
          Submit
        </button>
        <button className="tm-btn" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default TokenMinting;