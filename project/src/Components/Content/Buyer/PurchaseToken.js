import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
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

    const amountNumber = parseFloat(amount);

    const response = await fetch(
      "/purchasetoken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenName, amount: amountNumber }) // Send amount as a number
      }
    );

    const data = await response.json();
    console.log(data);
    
    if (data.success) {

      console.log("successfullyPurchasedToken");
      navigate('/buyerdashboard?success=true', storedUserData);
    }
    else {

      if (data.errorType === 'validationSymbol') {

          console.log("validationSymbol!");

          toast.error('Token Name cannot empty!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
          });

      } else if (data.errorType === 'tokenName') {

          console.log("tokenName");

          toast.error('Token Name not found !', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
          });
          setTokenName('');

      }
      else if (data.errorType === 'amount') {

        console.log("amount");

        toast.error('Number of Token cannot be empty!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setTokenName('');

    }
    }
    
  };

  return (
    <div className="pt-main">
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
        <button className="pt-btn" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default PurchaseToken;
