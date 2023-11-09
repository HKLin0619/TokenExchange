import React from 'react';
import "./FirstColumnStlye.css"

function FirstColumn(props) {
  return (

    <div className='first-column'>

        <div className="first-card">

            <div className="f-title">
                <h1>Admin</h1>
                <div className="f-underline"></div>
            </div>

            <div className="f-content">
                
                <h3>(A001)</h3>
                <h3>Tan Keat Rong</h3> 
                <h4>admin@gmail.com</h4>
                <button className="profile-btn">View More</button>    

            </div>

        </div>
        
    </div>

  )
}

export default FirstColumn