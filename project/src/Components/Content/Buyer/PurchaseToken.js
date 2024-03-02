import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PurchaseTokenStyle.css";

function PurchaseToken() {
  const [tokenName, setTokenName] = useState("");
  const [amount, setNumberOfToken] = useState("");
  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  console.log(amount)
  const amountNumber = parseFloat(amount);

  const handleBack = async () => {
    navigate("/buyerdashboard");
  };
  

  const handleSubmit = async () => {
    if (!tokenName || !amount) {
      console.error("Token name and token number have to be provided.");
      return;
    }
    else if (isNaN(amountNumber)) {
      console.error("Invalid amount");
      return;
    }

    console.log("Amount:", amount);
    console.log("Amount (Number):", amountNumber);

    const response = await fetch(
      "/purchasetoken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({tokenName, amount})
        
      }
    );
    console.log("Request Body:", JSON.stringify({ tokenName, amount }));
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
    console.log(tokenName);
    console.log(amount);

    const data = await response.json();

    console.log(data);

  };

  return (
    <div className="pt-main">
      <div className="pt-sub-main">
        <div className="pt-title">
          <h1>Purchase Token</h1>
          <div className="pt-underline"></div>
        </div>

        <div className="pt-inputs">
          <div className="pt-input">
            <i className="fa-solid fa-coins" />
            <input
              type="text"
              placeholder="Token Name (ERC20)"
              className="pt-name"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
            />
          </div>

          <div className="pt-input">
            <i className="fa-solid fa-plus" />
            <input
              type="number"
              placeholder="Number of Tokens"
              className="pt-name"
              value={amount}
              onChange={(e) => setNumberOfToken(e.target.value)}
            />
          </div>
        </div>

        <button className="pt-btn" onClick={handleSubmit}>
          Purchase
        </button>
      </div>
    </div>
  );
}

export default PurchaseToken;
