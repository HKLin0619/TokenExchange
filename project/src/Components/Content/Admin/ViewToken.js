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

            <div className='vt-shows'>

                <div className='vt-show'>
                    <h3>Token Name: </h3>
                    <span>{tokenData.tokenName}</span>
                </div>

                <div className='vt-show'>
                    <h3>Token Symbol: </h3>
                    <span>{tokenData.tokenSymbol}</span>
                </div>

                <div className='vt-show'>
                    <h3>Total Supply: </h3>
                    <span>{tokenData.balance ? tokenData.balance.toLocaleString() : 'Loading...'}</span>
                </div>

            </div>

            <button className='vt-btn' onClick={handleBack}>Back</button>

        </div>
       
    </div>
  )

}

export default ViewToken;
