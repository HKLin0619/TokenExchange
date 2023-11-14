import React from 'react'
import "./SignUpStyle.css";

function SignUp() {

  return (
    
    <div className="sign-up-main">

        <div className="sign-up-sub-main">

            <div className='sign-up-title'>
                <h1>Sign Up</h1>
                <div className='sign-up-underline'></div>
            </div>

            <div className='sign-up-inputs'>
                <div className='sign-up-input'>
                    <i className="fa-solid fa-user"/>
                    <input
                        type="text" 
                        placeholder="User Type" 
                        className="name" 
                        // value={userType} 
                        // onChange={(e) => setUserType(e.target.value)}
                        />
                </div>

                <div className='sign-up-input'>
                    <i className="fa-solid fa-user"/>
                    <input
                        type="text" 
                        placeholder="Username" 
                        className="name" 
                        // value={username} 
                        // onChange={(e) => setUsername(e.target.value)}
                        />
                </div>

                <div className='sign-up-input'>
                    <i className="fa-solid fa-user"/>
                    <input
                        type="text" 
                        placeholder="Email" 
                        className="name" 
                        // value={email} 
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                </div>

                <div className='sign-up-input'>
                    <i className="fa-solid fa-lock"/>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="name"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                </div>

                <div className='sign-up-input'>
                    <i className="fa-solid fa-lock"/>
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className="name"
                        // value={confirmPassword}
                        // onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                </div>
            </div>

            <button className='sign-up-btn'>Register</button>

            <div className="sign-up">
                <p>Already have an account ? <a href='/' className='sign-in-link'>Login</a></p>
            </div>
            
        </div>
       
    </div>
  )
}

export default SignUp