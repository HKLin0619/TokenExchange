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

  //for ipfs
  const [selectedFile, setSelectedFile] = useState(null);
  const [cid, setCid] = useState("");

  //ipfs JWT & Gateway
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzNGU2MDE2ZS03NDZkLTQ2OTctODM2OS05Y2ZmMGViODFkMjkiLCJlbWFpbCI6Imhvbmd6aGFubmdAeWFob28uY29tLm15IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjE2YTVhYTI2YTVkYmZkMGZlZjJiIiwic2NvcGVkS2V5U2VjcmV0IjoiNjM1NTY3ZTFkNmMxMTU4NzE4MmEwNzI0NmY1ODFjMGQyZDY3ZjEzYjRlZDFjNmJhYzAwZGEwNjI1Nzg3N2ZiZSIsImlhdCI6MTcxMDQ3Nzk5MH0.Or0JtYpwvSLk89cIYCLyVvryI1Q11xfAhzjumscA2qM";
  const Gateway = "https://scarlet-binding-rat-292.mypinata.cloud";

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
      console.log("Pinata link to: " + JWT);
      console.log("Gateway: " + Gateway);

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
                    disabled="true"
                    className="uta-name"
                  />
                }
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
