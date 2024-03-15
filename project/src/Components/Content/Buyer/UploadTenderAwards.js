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
  const [selectedFile, setSelectedFile] = useState("");
  const [cid, setCid] = useState();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

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

  const handleSubmittion = async () => {
    try {
      if (!selectedFile) {
        console.log("未选择文件");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const metadata = JSON.stringify({
        name: selectedFile.name, // 使用文件名作为元数据
      });
      formData.append("pinataMetadata", metadata);

      console.log("Pinata JWT Token:", import.meta.env.VITE_PINATA_JWT);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setCid(resData.IpfsHash);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div className="uta-main">
      <div className="uta-sub-main">
        <div className="uta-title">
          <h1>UploadTenderAwards</h1>
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
            <input type="file" onChange={changeHandler}></input>
            <button onClick={handleSubmittion}>Submit</button>
          </div>

          <div className="uta-input">
            <i className="fa-solid fa-file" />
            {cid && (
              <input
                type="text"
                placeholder="https://ipfs.io/..."
                className="uta-name"
                src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${cid}`}
                value={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${cid}`}
                onChange={(e) => setDocument(e.target.value)}
              />
            )}
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

        <button className="uta-btn" onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </div>
  );
}

export default UploadTenderAwards;
