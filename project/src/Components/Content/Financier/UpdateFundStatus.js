import React, { useState } from 'react';
import "./UpdateFundStatusStyle.css";

function UpdateFundStatus() {

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
    <div className="ufs-main">
        <div className="ufs-sub-main">
            <div className='ufs-title'>
                <h1>Update Fund Status</h1>
                <div className='ufs-underline'></div>
            </div>

            <div className='ufs-inputs'>

                <div className='ufs-input'>
                    <i className="ufs-solid ufs-user"/>
                    <input
                        type="text" 
                        placeholder="UserID" 
                        className="ufs-name"
                        value={userid}
                        onChange={(e) => setUserID(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='ufs-input'>
                    <i className="ufs-solid ufs-award"/>
                    <input 
                        type="text" 
                        placeholder="AwardID" 
                        className="ufs-name"
                        value={awardid}
                        onChange={(e) => setAwardID(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='ufs-input'>
                    <i className="ufs-solid ufs-user"/>
                    <input 
                        type="text" 
                        placeholder="SupplierID" 
                        className="ufs-name"
                        value={supplierid}
                        onChange={(e) => setSupplierID(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='ufs-input'>
                    <i className="ufs-solid ufs-usd"/>
                    <input 
                        type="text" 
                        placeholder="RM..." 
                        className="ufs-name"
                        value={awardamount}
                        onChange={(e) => setAwardAmount(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='ufs-input'>
                    <i className="ufs-solid ufs-file"/>
                    <input 
                        type="text" 
                        placeholder="https://ipfs.io/..." 
                        className="ufs-name"
                        value={document}
                        onChange={(e) => setDocument(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='tm-input'>
                    <i className="ufs-solid ufs-link"/>
                    <input 
                        type="text" 
                        placeholder="0x7be3b5f0f43b3ef1f14d26a66997" 
                        className="ufs-name"
                        value={documenthash}
                        onChange={(e) => setDocumentHash(e.target.value)}
                        disabled="true"/>
                </div>

                <div className='ufs-input'>
                    <i className="ufs-solid ufs-balance-scale"/>
                    <input 
                        type="text" 
                        placeholder="False" 
                        className="ufs-name"
                        value={fundstatus}
                        onChange={(e) => setFundStatus(e.target.value)}/>
                </div>

                <button className='tm-btn' onClick={handleSubmit}>Update</button>

            </div>

        </div>
       
    </div>
  )
}

export default UpdateFundStatus