import React, { useState } from 'react';
import "./TokenMinting.css";

function TokenMinting() {

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
    
    <div className="tm-main">

        <div className="tm-sub-main">

            <div className='tm-title'>
                <h1>Token Minting</h1>
                <div className='tm-underline'></div>
            </div>

            <div className='tm-inputs'>
                <div className='tm-input'>
                    <i className="fa-solid fa-coins"/>
                    <input
                        type="text" 
                        placeholder="Token Name (ERC20)" 
                        className="tm-name"
                        value={tokenName}
                        onChange={(e) => setTokenName(e.target.value)}/>
                </div>

                <div className='tm-input'>
                    <i className="fa-solid fa-plus"/>
                    <input 
                        type="text" 
                        placeholder="Number of Tokens" 
                        className="tm-name"
                        value={numberOfToken}
                        onChange={(e) => setNumberOfToken(e.target.value)}/>
                </div>
            </div>

            <button className='tm-btn' onClick={handleSubmit}>Submit</button>

        </div>
       
    </div>
  )
}

export default TokenMinting