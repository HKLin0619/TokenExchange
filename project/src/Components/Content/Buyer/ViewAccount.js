import { useNavigate } from 'react-router-dom';
import "./ViewAccountStyle.css";
import React, { useState, useEffect } from "react";

function ViewAccount() {
    const [tokenData, setTokenData] = useState({});

    const navigate = useNavigate();

    const handleBack = async () => {

        navigate('/buyerdashboard');

    }

    useEffect(() => {
        fetch("/viewbuyertoken")
          .then((res) => res.json())
          .then((e) => {
            setTokenData(e);
          });
      }, []);

  return (
    
    <div className="va-main">
        <div className="va-sub-main">
            <div className='va-title'>
                <h1>View Token</h1>
                <div className='va-underline'></div>
            </div>


            <div className="vt-shows">
                <p>
                    <strong>Token Symbol</strong>{" "}
                    <span style={{ marginLeft: "11px" }}>
                    : {tokenData.tokenSymbol}
                    </span>
                </p>
                <p>
                    <strong>Available Token</strong>{" "}
                    <span style={{ marginLeft: "0px" }}>
                    :{" "}
                    {tokenData.balance
                        ? tokenData.balance.toLocaleString()
                        : "Loading ......"}
                    </span>
                </p>
            </div>

            <button className='va-btn' onClick={handleBack}>Back</button>

        </div>
       
    </div>
  )

}

export default ViewAccount;
