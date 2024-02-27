import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PurchaseTokenStyle.css";

function PurchaseToken() {
  const [tokenName, setTokenName] = useState("");
  const [amount, setNumberOfToken] = useState("");
  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const handleBack = async () => {
    navigate("/buyerdashboard");
  };

  const handleSubmit = async () => {
    if (!tokenName || !amount) {
      console.error("Token name and token number have to be provided.");
      return;
    }
    //const amount = amount.toString;

    const response = await fetch(
      "http://localhost:3000/buyerdashboard/purchasetoken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenName, amount }),
        timeout: 60000,
      }
    );

    try {
      // Check if the response status is in the 2xx range for success
      if (response.ok) {
        console.log("Proceed to next step");

        // Handle the response data if needed
        const data = await response.json();
        console.log("Response Data:", data);
      } else {
        // If the response status is not in the 2xx range, log the error
        console.error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      // Handle any other errors that might occur during the fetch
      console.error("Error during fetch:", error);
    }

    const data = await response.json();

    console.log(data);

    if (data.success) {
      console.log("tokenPurchasedSuccessfully");
      navigate("/buyerdashboard?success=true", storedUserData);
    }

    if (!data.success) {
      console.error("Token purchase failed:", data.error);
      return;
    }
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
