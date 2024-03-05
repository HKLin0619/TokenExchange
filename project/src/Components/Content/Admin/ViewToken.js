import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ViewTokenStyle.css";

function ViewToken() {
    const [tokenData, setTokenData] = useState({});


    const navigate = useNavigate();

    const handleBack = async () => {

        navigate('/admindashboard');

    }

    useEffect(() => {
        fetch('/viewtoken')
        .then(res => res.json())
        .then(e => {
            setTokenData(e)
        })
    },[])

  return (
    
    <div className="vt-main">

        <div className="vt-sub-main">

            <div className='vt-title'>
                <h1>View Token</h1>
                <div className='vt-underline'></div>
            </div>


            <div className="vt-shows">
                <p><strong>Token Name</strong> <span style={{marginLeft: "21px"}}>:  {tokenData.tokenName ? tokenData.balance.toLocaleString() : 'Please Minting Token First !'}</span></p>
                <p><strong>Token Symbol</strong> <span style={{marginLeft: "10px"}}>:  {tokenData.tokenSymbol ? tokenData.balance.toLocaleString() : 'Please Minting Token First !'}</span></p>
                <p><strong>Total Supply</strong> <span style={{marginLeft: "22px"}}>:  {tokenData.balance ? tokenData.balance.toLocaleString() : 'Please Minting Token First !'}</span></p>
            </div>

            <button className='vt-btn' onClick={handleBack}>Back</button>

        </div>
       
    </div>
  )

}

export default ViewToken;
