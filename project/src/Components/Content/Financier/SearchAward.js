import React, { useState } from 'react';
import "./SearchAwardStyle.css";

function SearchAward() {

    const [awardName] = useState('');
    const [setAwardName] = useState('');

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
                <h1>Purchase Token</h1>
                <div className='tm-underline'></div>
            </div>

            <div className='tm-inputs'>
                <div className='tm-input'>
                    <i className="fa-solid fa-coins"/>
                    <input
                        type="text" 
                        placeholder="Token Name (ERC20)" 
                        className="tm-name"
                        value={awardName}
                        onChange={(e) => setAwardName(e.target.value)}/>
                </div>

            </div>

            <button className='tm-btn' onClick={handleSubmit}>Search</button>

        </div>
       
    </div>
  )
}

export default SearchAward