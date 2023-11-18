import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
// import Navbar from '../../Components/Navbar/Admin/Navbar'
=======
import { useNavigate } from 'react-router-dom';
import "./ViewTokenStyle.css";
>>>>>>> KangLin

function ViewToken() {
    const [tokenData, setTokenData] = useState({});

<<<<<<< HEAD
=======
    const navigate = useNavigate();

    const handleBack = async () => {

        navigate('/admindashboard');

    }

    const [tokenData, setTokenData] = useState({});

>>>>>>> KangLin
    useEffect(() => {
        fetch('/viewtoken')
        .then(res => res.json())
        .then(e => {
            setTokenData(e)
        })
    },[])
<<<<<<< HEAD
    
    return (
        <div>
            <h2>Token Details</h2>
            <p>Name: {tokenData.name}</p>
            <p>Symbol: {tokenData.symbol}</p>
            <p>Total Supply: {tokenData.ethTotallySupply}</p>
        </div>
    );
=======

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
                    <span>{tokenData.name}</span>
                </div>

                <div className='vt-show'>
                    <h3>Token Symbol: </h3>
                    <span>{tokenData.symbol}</span>
                </div>

                <div className='vt-show'>
                    <h3>Total Supply: </h3>
                    <span>{tokenData.ethTotallySupply}</span>
                </div>

            </div>

            <button className='vt-btn' onClick={handleBack}>Back</button>

        </div>
       
    </div>
  )
>>>>>>> KangLin
}

export default ViewToken;