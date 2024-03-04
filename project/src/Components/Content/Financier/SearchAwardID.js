import React, { useState, useEffect } from 'react';
import "./SearchAwardIDStyle.css";
import { useLocation, useNavigate } from 'react-router-dom';

function SearchAwardID() {
    const [userid, setUserID] = useState('');
    const [awardid, setAwardID] = useState('');
    const [supplierid, setSupplierID] = useState('');
    const [awardamount, setAwardAmount] = useState('');
    const [document, setDocument] = useState('');
    const [documenthash, setDocumentHash] = useState('');
    const [fundstatus, setFundStatus] = useState('');
    const navigate = useNavigate();
    
    const location = useLocation();

    const handleBack = async () => {
        navigate("/financierdashboard/searchaward");
      };
    
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paramAwardID = searchParams.get("awardID");
        fetchAwardID(paramAwardID);
    }, [location.search]);

   const fetchAwardID = async (paramAwardID) => {
    try {
        const response = await fetch("/searchawardid?awardid=" + paramAwardID, {
            method: "GET",
        });
        const result = await response.json();
        console.log(result);

        if (response.status === 200) {
            const awardData = result.data[0];
            setUserID(awardData.buyerid || ''); 
            setAwardID(awardData.awardid || '');
            setSupplierID(awardData.supplierid || '');
            setAwardAmount(awardData.awardamount || '');
            setDocument(awardData.document || '');
            setDocumentHash(awardData.award_doc_hash || '');
            setFundStatus(awardData.funded_ind || '');
        } else {
            console.error("Failed to fetch award ID:", result.message);
        }
    } catch (error) {
        console.error("Error fetching award ID:", error);
    }
};
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
                            // placeholder="UserID" 
                            className="tm-name"
                            value={userid}
                            disabled={true}
                        />
                    </div>

                    <div className='tm-input'>
                        <i className="fa-solid fa-award"/>
                        <input 
                            type="text" 
                            // placeholder="AwardID" 
                            className="tm-name"
                            value={awardid}
                            disabled={true}
                        />
                    </div>

                    <div className='tm-input'>
                        <i className="fa-solid fa-user"/>
                        <input 
                            type="text" 
                            // placeholder="SupplierID" 
                            className="tm-name"
                            value={supplierid}
                            disabled={true}
                        />
                    </div>

                    <div className='tm-input'>
                        <i className="fa-solid fa-usd"/>
                        <input 
                            type="text" 
                            // placeholder="RM..." 
                            className="tm-name"
                            value={awardamount}
                            disabled={true}
                        />
                    </div>

                    {/* <div className='tm-input'>
                        <i className="fa-solid fa-file"/>
                        <input 
                            type="text" 
                            // placeholder="https://ipfs.io/..." 
                            className="tm-name"
                            value={document}
                            disabled={true}
                        />
                    </div> */}

                    <div className='tm-input'>
                        <i className="fa-solid fa-link"/>
                        <input 
                            type="text" 
                            // placeholder="0x7be3b5f0f43b3ef1f14d26a66997" 
                            className="tm-name"
                            value={documenthash}
                            disabled={true}
                        />
                    </div>

                    <div className='tm-input'>
                        <i className="fa-solid fa-balance-scale"/>
                        <input 
                            type="text" 
                            // placeholder="False" 
                            className="tm-name"
                            value={fundstatus}
                            disabled={true}
                        />
                    </div>
                </div>
                <button className="tm-btn" onClick={handleBack}>
                Back
                </button>
            </div>
        </div>
    );
}

export default SearchAwardID;
