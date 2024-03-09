import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SearchAwardIDStyle.css";

function SearchAwardID() {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/financierdashboard/updateFundStatus');
    }


    const handleBack = () => {
        navigate('/financierdashboard');
    }


    return (
        <div className="sa-main">
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
                        placeholder="Award ID"
                        className="sa-name"

                        />
                    </div>
                </div>

                <button className="sa-btn-search" onClick={handleSearch}>Search</button>

                <button className='sa-btn' onClick={handleBack}>Back</button>

            </div>
        </div>
    );
}

export default SearchAwardID;
