import React, { useState } from "react";
import "./UploadTenderAwardsStyle.css";
import { useNavigate } from "react-router-dom";

function UploadTenderAwards() {
  const [userid, awardid, supplierid, awardamount, document, documenthash] =
    useState("");
  const [
    setUserID,
    setAwardID,
    setSupplierID,
    setAwardAmount,
    setDocument,
    setDocumentHash,
  ] = useState("");
  const navigate = useNavigate();

  const handleBack = async () => {
    navigate("/buyerdashboard");
  };

  const handleSubmit = async () => {
    // const response = await fetch('/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type' : 'application/json',
    //     },
    //     body: JSON.stringify({ username,password }),
    // });
  };

  return (
    <div className="uta-main">
      <div className="uta-sub-main">
        <div className="uta-title">
          <h1>Upload Tender Awards</h1>
          <div className="uta-underline"></div>
        </div>

        <div className="uta-inputs">
          <div className="uta-input">
            <i className="fa-solid fa-user" />
            <input
              type="text"
              placeholder="UserID"
              className="uta-name"
              value={userid}
              onChange={(e) => setUserID(e.target.value)}
              disabled="true"
            />
          </div>

          <div className="uta-input">
            <i className="fa-solid fa-award" />
            <input
              type="text"
              placeholder="AwardID"
              className="uta-name"
              value={awardid}
              onChange={(e) => setAwardID(e.target.value)}
              disabled="true"
            />
          </div>

          <div className="uta-input">
            <i className="fa-solid fa-user" />
            <input
              type="text"
              placeholder="SupplierID"
              className="uta-name"
              value={supplierid}
              onChange={(e) => setSupplierID(e.target.value)}
            />
          </div>

          <div className="uta-input">
            <i className="fa-solid fa-usd" />
            <input
              type="text"
              placeholder="RM..."
              className="uta-name"
              value={awardamount}
              onChange={(e) => setAwardAmount(e.target.value)}
            />
          </div>

          <div className="uta-input">
            <i className="fa-solid fa-file" />
            <input
              type="text"
              placeholder="https://ipfs.io/..."
              className="uta-name"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
            />
          </div>

          <div className="uta-input">
            <i className="fa-solid fa-link" />

            <input
              type="text"
              placeholder="0x7be3b5f0f43b3ef1f14d26a66997"
              className="uta-name"
              value={documenthash}
              onChange={(e) => setDocumentHash(e.target.value)}
            />
          </div>
        </div>

        <button className="uta-btn-upload" onClick={handleSubmit}>
          Upload
        </button>
        <button className="uta-btn-back" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default UploadTenderAwards;
