import React, { useEffect, useState, useRef } from "react";
import "./UploadTenderAwardsStyle.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function UploadTenderAwards() {
  const [userid, setUserID] = useState("");
  const [awardid, setAwardID] = useState("");
  const [supplierid, setSupplierID] = useState("");
  const [awardamount, setAwardAmount] = useState("");
  const [setDocument] = useState("");
  const [setDocumentHash] = useState("");
  const [awardCid, setAwardCid] = useState(""); // New state for award CID
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const inputRef = useRef();

  //for ipfs
  const [selectedFile, setSelectedFile] = useState(null);
  const [cid, setCid] = useState("");

  const copyText = () => {
    if (inputRef.current) {
      inputRef.current.select();
      console.log("start copy");
      navigator.clipboard
        .writeText(inputRef.current.value)
        .then(() => {
          if(inputRef.current.value === "https://ipfs.io/ipfs/") {
            // alert("Please upload file first");
            
            toast.warning("Please upload the document !", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            return;
          } else {
            // alert("Link copied to clipboard: " + inputRef.current.value);
            toast.success("Link copied to clipboard: " + inputRef.current.value, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            return;
          }
        })
        .catch((error) => {
          console.error("Failed to copy:", error);
        });
    }
  };

  //ipfs JWT & Gateway
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJiZjI0OTAyZS0zNDMzLTQ0N2EtYTU4OS04NmE5NDhhNmM4NWMiLCJlbWFpbCI6Indpbmd5dWVuLmxvb25AaG9yZWNhYmlkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI4ZmY5MDUxZDIyM2UxYzVmZjlkYyIsInNjb3BlZEtleVNlY3JldCI6ImQzNzA3MDVmNjc3ZGMwMzBlZmExNWQ3YjQzMDc2YWU4YmYzMzdiNmM5NTJiYjExYzBmZTlmYjBiNGUyZjU2OTkiLCJpYXQiOjE3MDgwODMzODF9.wLRyfClxRS76viyK3EgJWtZiQD1cxS7l1ucLiaVyy0I";
  // const Gateway = "https://copper-urgent-centipede-241.mypinata.cloud";

  const changeHandler = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

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
  });

  //handle submit for ipfs file
  const handleSubmittion = async () => {
    try {
      if (!selectedFile) {
        console.log("no file selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const metadata = JSON.stringify({
        name: selectedFile.name,
      });
      formData.append("pinataMetadata", metadata);

      //checking connection to pinata
      //console.log("Pinata link to: " + JWT);
      //console.log("Gateway: " + Gateway);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setCid(resData.IpfsHash);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      // Check if all required fields are filled
      if (!supplierid || !awardamount || !cid) {
        toast.error("Please fill all required fields and upload the document!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }
  
      // Once CID is generated, submit form data to the server
      const document = `https://ipfs.io/ipfs/${cid}`;
      const documenthash = cid;
  
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
  
      const responseData = await response.json();
      console.log("Server response:", responseData);
  
      if (responseData.success) {
        // Generate PDF with form data
        generatePDF({
          UserID: userid,
          AwardID: awardid,
          SupplierID: supplierid,
          AwardAmount: awardamount,
          DocumentLink: document,
          DocumentHash: documenthash,
        });
  
        navigate("/buyerdashboard?success=trueTender", storedUserData);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };
  
  const handleBack = async () => {
    navigate("/buyerdashboard");
  };

  const generatePDF = async (formData) => {
    try {
      // Create a new jsPDF instance
      const doc = new jsPDF();
  
      // Add form data to the PDF
      doc.text("User ID: " + formData.UserID, 10, 10);
      doc.text("Award ID: " + formData.AwardID, 10, 20);
      doc.text("Supplier ID: " + formData.SupplierID, 10, 30);
      doc.text("Award Amount: " + formData.AwardAmount, 10, 40);
      doc.text("Document Link: " + formData.DocumentLink, 10, 50);
      doc.text("Document Hash: " + formData.DocumentHash, 10, 60);
  
      // Generate a unique filename based on the IPFS hash
      const filename = `${formData.DocumentHash}.pdf`;
  
      // Convert the PDF document to a Blob
      const blob = doc.output("blob");
  
      // Create a FormData object and append the Blob
      const formDataObj = new FormData();
      formDataObj.append("file", blob, filename);
  
      // Upload the PDF Blob to Pinata
      const metadata = JSON.stringify({
        name: filename,
      });
      formDataObj.append("pinataMetadata", metadata);
  
      const options = JSON.stringify({
        cidVersion: 0,
      });
      formDataObj.append("pinataOptions", options);
  
      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${JWT}`,
          },
          body: formDataObj,
        }
      );
      const resData = await res.json();
      const newDocumentLink = `https://ipfs.io/ipfs/${resData.IpfsHash}`;

      console.log("newDocumentLink: ", newDocumentLink)
  
      // Return the new document link
      return newDocumentLink;
    } catch (error) {
      console.error("Error generating PDF and uploading to Pinata:", error);
      return null;
    }
  };

  return (
    <div className="uta-main">
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
            <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Supplier ID : </span>
            <input
              type="text"
              placeholder="Enter Supplier ID"
              className="uta-name"
              value={supplierid}
              onChange={(e) => setSupplierID(e.target.value)}
            />
          </div>

          <div className="uta-input">
            <i className="fa-solid fa-usd" />
            <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Award Amount : RM </span>
            <input
              type="text"
              placeholder="0.00"
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
              <input type="file" onChange={changeHandler}></input>
              <button
                className="uta-ipfs-btn-upload"
                onClick={handleSubmittion}
              >
                Upload
              </button>
            </div>
          </div>

          <div className="uta-ipfs-outputs">
            <div className="uta-ipfs-output">
              <i className="fa-solid fa-file" style={{ marginRight: "28px" }} />
              <p>
                <strong>Document</strong>
                <span style={{ marginLeft: "41px" }}> : </span>
                {
                  <input
                    type="text"
                    placeholder="https://ipfs.io/..."
                    src={`https://ipfs.io/ipfs/${cid}`}
                    value={`https://ipfs.io/ipfs/${cid}`}
                    onChange={(e) => setDocument(e.target.value)}
                    ref={inputRef}
                    disabled="true"
                    className="uta-name"
                  />
                }
                <span style={{ marginLeft: "10px" }}><button className="uta-ipfs-btn-upload" onClick={copyText}>Copy Link</button></span>
              </p>
            </div>

            

            <div className="uta-ipfs-output">
              <i className="fa-solid fa-link" />
              <p>
                <strong>Document Hash</strong>
                <span> : </span>
                <input
                  type="text"
                  placeholder="0x7be3b5f0f43b3ef1f14d26a66997"
                  value={cid}
                  onChange={(e) => setDocumentHash(e.target.value)}
                  disabled="true"
                  className="uta-name"
                />
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
