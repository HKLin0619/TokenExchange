import React from 'react'
import "./TokenMinting.css";

function TokenMinting() {

  return (
    
    <div className="main">

        <div className="sub-main">

            <div className='title'>
                <h1>Token Minting</h1>
                <div className='underline'></div>
            </div>

            <div className='inputs'>
                <div className='input'>
                    <i className="fa-solid fa-user"/>
                    <input
                        type="text" 
                        placeholder="Token Name (ERC20)" 
                        className="name"/>
                </div>

                <div className='input'>
                    <i className="fa-solid fa-lock"/>
                    <input 
                        type="text" 
                        placeholder="Number of Tokens" 
                        className="name"/>
                </div>
            </div>

            <button className='btn'>Login</button>

        </div>
       
    </div>
  )
}

export default TokenMinting