import React, { useEffect, useState } from "react";
import "./UploadTenderAwardsStyle.css";
import { useNavigate } from "react-router-dom";

function UploadTenderAwards() {
  const [userid, setUserID] = useState("");
  const [awardid, setAwardID] = useState("");
  const [supplierid, setSupplierID] = useState("");
  const [awardamount, setAwardAmount] = useState("");
  const [document, setDocument] = useState("");
  const [documenthash, setDocumentHash] = useState("");
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  // const [userid, awardid, supplierid, awardamount, document, documenthash] =
  //   useState("");
  // const [
  //   setUserID,
  //   setAwardID,
  //   setSupplierID,
  //   setAwardAmount,
  //   setDocument,
  //   setDocumentHash,
  // ] = useState("");
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Usernanme:" + storedUserData.userName);
      try {
        // Check if storedUserData is an object and has a username property
        if (
          storedUserData &&
          typeof storedUserData === "object" &&
          storedUserData.userName
        ) {
          const { userName } = storedUserData;

          const response = await fetch(`/searchUserID?userName=${userName}`);
          if (!response.ok) {
            throw new Error(
              `Error: ${response.status} - ${response.statusText}`
            );
          }
          const data = await response.json();

          setUserID(data.userId);
          setAwardID(data.awardId);
          // Set other state values if needed
          console.log("UserID and AwardID:", data.userId, data.awardId);
        } else {
          console.error("Invalid storedUserData:", storedUserData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch("/writeData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
          awardid,
          supplierid,
          awardamount,
          document,
          documenthash,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      // Optionally handle the response from the server, if needed
      const responseData = await response.json();
      console.log("Server response:", responseData);

      if (responseData.success) {
        console.log("successfullyWriteData");
        navigate("/buyerdashboard?success=true", storedUserData);
      }
      // You can also redirect or perform other actions after a successful request
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleBack = async () => {
    navigate("/buyerdashboard");
  };

  return (
    <div className="uta-main">

      <div className="uta-sub-main">

        <div className="uta-title">
          <h1>Upload Tender Awards</h1>
          <div className="uta-underline"></div>
        </div>

        <div className="uta-outputs">

          <div className="uta-output">
            <i className="fa-solid fa-user" />
            <p>
              <strong>User ID</strong>
              <span> : {userid}</span>
            </p>
          </div>

          <div className="uta-output">
            <i className="fa-solid fa-award" />
            <p>
              <strong>Award ID</strong>
              <span> : {awardid}</span>
            </p>
          </div>

        </div>

        <div className="uta-inputs">
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
        </div>

        <div className="uta-sec-sub-main">

          <h6>*Pleasae upload your document</h6>

          <div className="uta-uploads">
            <div className="uta-upload">
              <input type="file" onChange={''}></input>
              <button className="uta-ipfs-btn-upload" onClick={''}>Upload</button>
            </div>
          </div>

          <div className="uta-ipfs-outputs">

            <div className="uta-ipfs-output">
              <i className="fa-solid fa-file"  style={{marginRight: "28px"}}/>
              <p>
                <strong>Document</strong>
                <span style={{marginLeft: "41px"}}> : {document}</span>
              </p>
            </div>

            <div className="uta-ipfs-output">
              <i className="fa-solid fa-link" />
              <p>
                <strong>Document Hash</strong>
                <span> : {documenthash}</span>
              </p>
          </div>

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
