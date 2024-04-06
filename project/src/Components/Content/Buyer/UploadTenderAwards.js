import React, { useEffect, useState, useRef } from "react";
import "./UploadTenderAwardsStyle.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function UploadTenderAwards() {
  const [userid, setUserID] = useState("");
  const [awardid, setAwardID] = useState("");
  const [supplierid, setSupplierID] = useState("");
  const [awardamount, setAwardAmount] = useState("");
  const [document, setDocument] = useState("");
  const [documenthash, setDocumentHash] = useState("");
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
  const Gateway = "https://copper-urgent-centipede-241.mypinata.cloud";

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
  }, []);

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
      //check is data sent success
      //console.log("hash: " + resData.IpfsHash);
      //console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const document = `https://ipfs.io/ipfs/${cid}`;
    const documenthash = cid;
    //console.log("Doc: " + document);
    //console.log("Dochash: " + documenthash);

    if (!supplierid) {
      // alert("SupplierID is not filled.");
      // return;

      toast.error("SupplierID is not filled !", {
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
    } else if (!awardamount) {
      // alert("Award amount is not filled.");
      // return;
      toast.error("Award amount is not filled !", {
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
    } else if (!selectedFile) {
      // alert("Document is not uploaded.");
      // return;
      toast.error("Document is not uploaded !", {
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
    } else if (!documenthash) {
      // alert("Document hash is not generated.");
      // return;
      toast.error("Document hash is not generated !", {
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

    //console.log("Checking Status 1");

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

      //console.log("Checking Status 2");

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
