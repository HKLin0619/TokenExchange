import React, { useState, useEffect } from 'react';
import "./UpdateFundStatusStyle.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";

function UpdateFundStatus() {
    const navigate = useNavigate();
    const [status, setStatus] = useState();
    //const [userID, setUserID] = useState('');
    const [awardid, setAwardID] = useState('');
    const [supplierid, setSupplierID] = useState('');
    const [awardamount, setAwardAmount] = useState('');
    const [document, setDocument] = useState('');
    const [documenthash, setDocumentHash] = useState('');
    //const [fundstatus, setFundStatus] = useState('');
    const location = useLocation();

    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    const financierID = storedUserData.userID;

    const handleBack = () => {
        navigate('/financierdashboard/searchAwardID');
    }

    const handleUpdate = async () => {
        // Send the selected status to the backend for updating
        console.log("Selected status:", status);
        // Add your logic to send the selected status to the backend for updating
        try {

            const response = await fetch("/updateFundStatus", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status, awardid, financierID }),
            });
    
            const data = await response.json();
            console.log(data);
    
            if (data.status === 200) {

                //navigate(`/financierdashboard/fundingStatus?awardID=${awardid}?success=true`);
                navigate(`/financierdashboard/fundingStatus?awardID=${awardid}&success=true`);


                
            } else if (data.status === 250) {

                navigate(`/financierdashboard/searchAwardID?success=again`);

            } else if (data.status === 400) {

                toast.error("Please select funded status !", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            }
            else {
                console.log("No matching awardID found.");
            }
        } catch (error) {
            console.error(error);
            // Handle errors here, such as displaying an error message to the user
        }
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
                // setUserID(awardData.buyerid || ''); 
                setAwardID(awardData.awardid || '');
                setSupplierID(awardData.supplierid || '');
                setAwardAmount(awardData.awardamount || '');
                setDocumentHash(awardData.award_doc_hash || '');
                // setFundStatus(awardData.funded_ind || '');
                setDocument(awardData.document || '');
            } else {
                console.error("Failed to fetch award ID:", result.message);
            }
        } catch (error) {
            console.error("Error fetching award ID:", error);
        }
    };

    const handleChangeStatus = (event) => {
        const value = event.target.value === "true"; 
        setStatus(value);
    };

    // const handleChangeStatus = (event) => {
    //     setStatus(event.target.value);
    // }

    return (
        <div className="ufs-main">
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="ufs-sub-main">
                <div className='ufs-title'>
                    <h1>Upload Fund Status</h1>
                    <div className='ufs-underline'></div>
                </div>

                <div className="ufs-shows">
                    <p><strong>User ID</strong> <span style={{ marginLeft: "105px" }}>: {financierID} </span></p>
                    <p><strong>Award ID</strong> <span style={{ marginLeft: "91px" }}>: {awardid} </span></p>
                    <p><strong>Supplier ID</strong> <span style={{ marginLeft: "77px" }}>: {supplierid} </span></p>
                    <p><strong>Award Amount (RM)</strong> <span style={{ marginLeft: "5px" }}>: {awardamount} </span></p>
                    <p><strong>Document (IPFS)</strong> <span style={{ marginLeft: "35px" }}>: <br></br>{document}</span></p>
                    <p><strong>Document Hash</strong> <span style={{ marginLeft: "41px" }}>: <br></br>{documenthash}</span></p>
                    <label>
                        <strong style={{ color: "red" }}>Status is Funded*</strong>
                        <span style={{ marginLeft: "32px" }}>:  </span>

                        <input
                            className='ufs-radio-btn1'
                            type="radio"
                            name="status"
                            value="true"
                            checked={status === true}            
                            onChange={handleChangeStatus}
                        />
                        <strong style={{ color: "green" }} className='ufs-radio-text1'>True</strong>

                        <input
                            className='ufs-radio-btn2'
                            type="radio"
                            name="status"
                            value="false"
                            checked={status === false}
                            onChange={handleChangeStatus}
                        />
                        <strong style={{ color: "red" }} className='ufs-radio-text2'>False</strong>
                    </label>
                </div>

                <button className='ufs-btn-update' onClick={handleUpdate}>Update</button>

                <button className='ufs-btn' onClick={handleBack}>Back</button>

            </div>
        </div>
    )
}

export default UpdateFundStatus;
