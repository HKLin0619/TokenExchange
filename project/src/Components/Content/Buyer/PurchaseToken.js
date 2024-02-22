import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./PurchaseTokenStyle.css";

function PurchaseToken() {

    const [tokenSymbol, setTokenName] = useState('');
    const [numberOfToken, setNumberOfToken] = useState('');
    const navigate = useNavigate();
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    const handleBack = async()=>{
        navigate('/buyerdashboard');
    }

    const handleSubmit = async () => {

        const response = await fetch('/purchasetoken', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({tokenSymbol,numberOfToken}),
        });

        const data = await response.json();

        console.log(data);

        if (data.success) {

            console.log("tokenPurchasedSuccessfully");
            navigate('/buyerdashboard?success=true', storedUserData);
            
        }

    }
    
  return (
    
    <div className="pt-main">

        <div className="pt-sub-main">

            <div className='pt-title'>
                <h1>Purchase Token</h1>
                <div className='pt-underline'></div>
            </div>

            <div className='pt-inputs'>
                <div className='pt-input'>
                    <i className="fa-solid fa-coins"/>
                    <input
                        type="text" 
                        placeholder="Token Name (ERC20)" 
                        className="pt-name"
                        value={tokenSymbol}
                        onChange={(e) => setTokenName(e.target.value)}/>
                </div>

                <div className='pt-input'>
                    <i className="fa-solid fa-plus"/>
                    <input 
                        type="text" 
                        placeholder="Number of Tokens" 
                        className="pt-name"
                        value={numberOfToken}
                        onChange={(e) => setNumberOfToken(e.target.value)}/>
                </div>
            </div>

            <button className='pt-btn' onClick={handleSubmit}>Purchase</button>

        </div>
       
    </div>
  )
}

export default PurchaseToken