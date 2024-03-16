import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SearchAward() {
  const [awardID, setAwardID] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [documenthash, setDocumentHash] = useState("");

  const handleBack = () => {
    navigate("/financierdashboard");
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/searchaward", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ awardID }),
      });

      console.log(response);
      if (!response.ok) {
        throw new Error("Request failed with status: " + response.status);
      }

      const data = await response.json();
      console.log(data);
      //console.log("document" + data.document);

      const result = await fetch("/searchawardid?awardid=" + awardID, {
        method: "GET",
      });
      const output = await result.json();
      console.log("checking:");
      console.log(output);

      const award = output.data[0].award_doc_hash;
      //setDocumentHash(award.award_doc_hash || "");
      console.log("checking:" + award);

      if (data.status === 200) {
        console.log("Success");
        // Navigate to "/searchawardid" route passing the awardID as a query parameter
        window.open(
          "https://ipfs.io/ipfs/" +
            award +
            "?filename=" +
            awardID +
            "&download=true"
        );
        //window.open("https://ipfs.io/ipfs/" + award);

        navigate(`/financierdashboard/searchawardid?awardID=${awardID}`);
      } else {
        console.log("No matching awardID found.");
      }
    } catch (error) {
      console.error(error);
      // Handle errors here, such as displaying an error message to the user
    }
  };

  // Extract awardID from query parameters when component mounts
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const paramAwardID = searchParams.get("awardID");
    if (paramAwardID) {
      setAwardID(paramAwardID);
      // Now you can perform further actions based on the awardID
      // For example, fetch additional data based on the awardID
    }
  }, [location.search]);

  return (
    <div className="tm-main">
      <div className="tm-sub-main">
        <div className="tm-title">
          <h1>Search Award</h1>
          <div className="tm-underline"></div>
        </div>
        <div className="tm-inputs">
          <div className="tm-input">
            <i className="fa-solid fa-coins" />
            <input
              type="text"
              placeholder="AwardID"
              className="tm-name"
              value={awardID}
              onChange={(e) => setAwardID(e.target.value)}
            />
          </div>
        </div>
        <button className="tm-btn" onClick={handleSubmit}>
          Search
        </button>
        <button className="tm-btn" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default SearchAward;
