import React from 'react';
import { useLocation } from 'react-router-dom';
import "./ProfileCardStlye.css"

function ProfileCard() {

  const Location = useLocation();
  const userData = Location.state && Location.state.userData;

  return (

    <div className='first-column'>

        <div className="first-card">

            <div className="f-title">
                <h1>{userData.userType.toUpperCase()}</h1>
                <div className="f-underline"></div>
            </div>

            <div className="f-content">
                
                <h3>({userData.userID})</h3>
                <h3>{userData.userName}</h3> 
                <h4>{userData.email}</h4>
                <button className="profile-btn">View More</button>    

            </div>

        </div>
        
    </div>

  )
}

export default ProfileCard