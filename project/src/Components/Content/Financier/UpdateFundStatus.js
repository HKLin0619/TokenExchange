import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./UpdateFundStatusStyle.css";

function UpdateFundStatus() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('');

    const handleBack = () => {
        navigate('/financierdashboard/searchAwardID');
    }

    const handleUpdate = () => {
        // Send the selected status to the backend for updating
        console.log("Selected status:", status);
        // Add your logic to send the selected status to the backend for updating
    }

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    }

    return (
        <div className="ufs-main">
            <div className="ufs-sub-main">
                <div className='ufs-title'>
                    <h1>Upload Fund Status</h1>
                    <div className='ufs-underline'></div>
                </div>

                <div className="ufs-shows">
                    <p><strong>User ID</strong> <span style={{ marginLeft: "105px" }}>:  </span></p>
                    <p><strong>Award ID</strong> <span style={{ marginLeft: "91px" }}>:  </span></p>
                    <p><strong>Supplier ID</strong> <span style={{ marginLeft: "77px" }}>:  </span></p>
                    <p><strong>Award Amount (RM)</strong> <span style={{ marginLeft: "5px" }}>:  </span></p>
                    <p><strong>Document (IPFS)</strong> <span style={{ marginLeft: "35px" }}>:  </span></p>
                    <p><strong>Document Hash</strong> <span style={{ marginLeft: "41px" }}>:  </span></p>
                    <label>
                        <strong style={{ color: "red" }}>Status is Funded*</strong>
                        <span style={{ marginLeft: "32px" }}>:  </span>

                        <input
                            className='ufs-radio-btn1'
                            type="radio"
                            name="status"
                            value="Funded"
                            checked={status === "Funded"}
                            onChange={handleChangeStatus}
                        />
                        <strong style={{ color: "green" }} className='ufs-radio-text1'>True</strong>

                        <input
                            className='ufs-radio-btn2'
                            type="radio"
                            name="status"
                            value="0"
                            checked={status === "0"}
                            onChange={handleChangeStatus}
                        />
                        <strong style={{ color: "red" }} className='ufs-radio-text2'>0</strong>
                    </label>
                </div>

                <button className='ufs-btn-update' onClick={handleUpdate}>Update</button>

                <button className='ufs-btn' onClick={handleBack}>Back</button>

            </div>
        </div>
    )
}

export default UpdateFundStatus;
