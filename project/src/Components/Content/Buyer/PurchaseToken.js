import React, { useState } from 'react';
import "./PurchaseTokenStyle.css";

function PurchaseToken() {

    const [tokenName, setTokenName] = useState('');
    const [numberOfToken, setNumberOfToken] = useState('');

    const handleSubmit = async () => {

        // const response = await fetch('/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type' : 'application/json',
        //     },
        //     body: JSON.stringify({ username,password }),
        // });

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
                        value={tokenName}
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