import React from 'react';
import "./ProfileCardStlye.css"

function ProfileCard({ userData }) {

  return (

    <div className="first-card">

      <div className="f-title">
        <h1>{userData.userType.toUpperCase()}</h1>
        <div className="f-underline"></div>
      </div>

      <div className="f-content">
        <div className="f-user-info">
          <p><strong>User ID</strong> <span style={{marginLeft: "40px"}}>: {userData.userID}</span></p>
          <p><strong>User Name </strong> <span style={{marginLeft: "12px"}}>: {userData.userName}</span></p>
          <p><strong>User Email </strong> <span style={{marginLeft: "15px"}}>: {userData.email}</span></p>
        </div>
              
        <button className="profile-btn">Edit Profile</button>    

      </div>

    </div>

  )
}

export default ProfileCard