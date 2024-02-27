import React, { useState } from 'react';
import "./SearchAwardIDStyle.css";

function SearchAwardID() {

    const [userid,awardid,supplierid,awardamount,document,documenthash,fundstatus] = useState('');
    const [setUserID,setAwardID,setSupplierID,setAwardAmount,setDocument,setDocumentHash,setFundStatus] = useState('');

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
                <h1>Award ID Result</h1>
                <div className='tm-underline'></div>
            </div>

            <div className='tm-inputs'>

                <div className='tm-input'>
                    <i className="fa-solid fa-user"/>
                    <input
                        type="text" 
                        placeholder="UserID" 
                        className="tm-name"
                        value={userid}
                        onChange={(e) => setUserID(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='tm-input'>
                    <i className="fa-solid fa-award"/>
                    <input 
                        type="text" 
                        placeholder="AwardID" 
                        className="tm-name"
                        value={awardid}
                        onChange={(e) => setAwardID(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='tm-input'>
                    <i className="fa-solid fa-user"/>
                    <input 
                        type="text" 
                        placeholder="SupplierID" 
                        className="tm-name"
                        value={supplierid}
                        onChange={(e) => setSupplierID(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='tm-input'>
                    <i className="fa-solid fa-usd"/>
                    <input 
                        type="text" 
                        placeholder="RM..." 
                        className="tm-name"
                        value={awardamount}
                        onChange={(e) => setAwardAmount(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='tm-input'>
                    <i className="fa-solid fa-file"/>
                    <input 
                        type="text" 
                        placeholder="https://ipfs.io/..." 
                        className="tm-name"
                        value={document}
                        onChange={(e) => setDocument(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='tm-input'>
                    <i className="fa-solid fa-link"/>
                    <input 
                        type="text" 
                        placeholder="0x7be3b5f0f43b3ef1f14d26a66997" 
                        className="tm-name"
                        value={documenthash}
                        onChange={(e) => setDocumentHash(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='tm-input'>
                    <i className="fa-solid fa-balance-scale"/>
                    <input 
                        type="text" 
                        placeholder="False" 
                        className="tm-name"
                        value={fundstatus}
                        onChange={(e) => setFundStatus(e.target.value)}
                        disabled="true"/>
                </div>

            </div>

        </div>
       
    </div>
  )
}

export default SearchAwardID