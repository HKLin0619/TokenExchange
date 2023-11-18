import React, { useState, useEffect } from 'react';
// import Navbar from '../../Components/Navbar/Admin/Navbar'

function ViewToken() {
    const [tokenData, setTokenData] = useState({});

    useEffect(() => {
        fetch('/viewtoken')
        .then(res => res.json())
        .then(e => {
            setTokenData(e)
        })
    },[])
    
    return (
        <div>
            <h2>Token Details</h2>
            <p>Name: {tokenData.name}</p>
            <p>Symbol: {tokenData.symbol}</p>
            <p>Total Supply: {tokenData.ethTotallySupply}</p>
        </div>
    );
}

export default ViewToken;