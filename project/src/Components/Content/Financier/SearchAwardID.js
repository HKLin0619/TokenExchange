import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./SearchAwardIDStyle.css";
import { ToastContainer, toast } from "react-toastify";

function SearchAwardID() {
    const [awardID, setAwardID] = useState("");
    const location = useLocation();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/financierdashboard");
    };

    const handleSearch = async () => {
        try {
            if (!awardID) {
                console.log("No awardID provided.");
                return;
            }
    
            const response = await fetch("/searchAwardID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ awardID }),
            });
    
            if (!response.ok) {
                throw new Error("Request failed with status: " + response.status);
            }
    
            const data = await response.json();
            console.log(data);
    
            if (data.status === 200) {
                navigate(`/financierdashboard/fundingStatus?awardID=${awardID}`);
            
            }
            else if (data.status === 250){
                navigate(`/financierdashboard/updateFundStatus?awardID=${awardID}`);
            }
            else {
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

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const successParam = queryParams.get('success');
    
        if (successParam === 'again') {
            toast.success('Please use another award ID !', {
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
    }, [location.search]);


    return (
        <div className="sa-main">

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

            <div className="sa-sub-main">
                <div className='sa-title'>
                    <h1>Search Award ID</h1>
                    <div className='sa-underline'></div>
                </div>

                <div className="sa-inputs">
                    <div className="sa-input">
                        <i className="fa-solid fa-magnifying-glass"/>
                        <input
                            type="text"
                            placeholder="AwardID"
                            className="tm-name"
                            value={awardID}
                            onChange={(e) => setAwardID(e.target.value)}/>
                    </div>
                </div>

                <button className="sa-btn-search" onClick={handleSearch}>Search</button>

                <button className='sa-btn' onClick={handleBack}>Back</button>

            </div>
        </div>
    );
}

export default SearchAwardID;
