import React, { useState, useEffect } from 'react';
import "./FundingStatusStyle.css";
import { useLocation, useNavigate } from 'react-router-dom';

function FundingStatus() {

    const navigate = useNavigate();
    const [awardid, setAwardID] = useState('');
    const [supplierid, setSupplierID] = useState('');
    const [awardamount, setAwardAmount] = useState('');
    const [document, setDocument] = useState('');
    const [documenthash, setDocumentHash] = useState('');
    const [fundstatus, setFundStatus] = useState('');
    const location = useLocation();
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
  
    useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const successParam = queryParams.get('success');
  
      if (successParam === 'true') {
        //   toast.success('Token Minting Successfully !', {
        //       position: "top-center",
        //       autoClose: 5000,
        //       hideProgressBar: false,
        //       closeOnClick: true,
        //       pauseOnHover: true,
        //       draggable: true,
        //       progress: undefined,
        //       theme: "colored",
        //   });
      } 
    }, [location.search]);

    const handleBack = async () => {

        navigate('/financierdashboard/searchAwardID');

    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paramAwardID = searchParams.get("awardID");
        fetchAwardID(paramAwardID);
    }, [location.search]);

    const fetchAwardID = async (paramAwardID) => {
        try {
            const response = await fetch("/fundingStatus?awardid=" + paramAwardID, {
                method: "GET",
            });
            const result = await response.json();
            console.log(result);
    
            if (response.status === 200) {
                const awardData = result.data[0];
                const fundedIndString = awardData.funded_ind.toString();
                // setUserID(awardData.buyerid || ''); 
                setAwardID(awardData.awardid || '');
                setSupplierID(awardData.supplierid || '');
                setAwardAmount(awardData.awardamount || '');
                setDocumentHash(awardData.award_doc_hash || '');
                setFundStatus(fundedIndString || '');
                setDocument(awardData.document || '');
                console.log(awardData.funded_ind);
            } else {
                console.error("Failed to fetch award ID:", result.message);
            }
        } catch (error) {
            console.error("Error fetching award ID:", error);
        }
    };

  return (
    
    <div className="fa-main">

        <div className="fa-sub-main">

            <div className='fa-title'>
                <h1>Funding Status</h1>
                <div className='vt-underline'></div>
            </div>


            <div className="fa-shows">
                <p><strong>AwardID</strong> <span style={{marginLeft: "96px"}}>: {awardid}</span></p>
                <p><strong>SupplierID</strong> <span style={{marginLeft: "82px"}}>: {supplierid}</span></p>
                <p><strong>Award Amount (RM)</strong> <span style={{marginLeft: "5px"}}>: {awardamount}</span></p>
                <p><strong>Document (IPFS)</strong> <span style={{marginLeft: "35px"}}>: {document}</span></p>
                <p><strong>Document Hash</strong> <span style={{marginLeft: "41px"}}>: {documenthash}</span></p>
                <p><strong>Status is Funded</strong> <span style={{marginLeft: "39px"}}>: {fundstatus}</span></p>
            </div>


            <button className='fa-btn' onClick={handleBack}>Back</button>

        </div>
       
    </div>
  )

}

export default FundingStatus;