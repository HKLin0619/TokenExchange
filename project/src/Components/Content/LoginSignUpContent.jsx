import React from 'react'
import "./LoginSignUpContentStyle.css";

function LoginSignUpContent() {
  return (
    <div className="main">

        <div className="sub-main">

            <div className='title'>
                <h1>ERC 20 Tokem Exchange</h1>
                <div className='underline'></div>
            </div>

            <div className='inputs'>
                <div className='input'>
                    <i className="fa-solid fa-user"/>
                    <input type="text" placeholder="Username" className="name"/>
                </div>

                <div className='input'>
                    <i className="fa-solid fa-lock"/>
                    <input type="password" placeholder="Password" className="name"/>
                </div>
            </div>

            <div className='forgot-remember'>
                <label><input type='checkbox'/>Remember Me</label>
                <a href="/">Forgot password ?</a>
            </div>

            <button className='btn'>Login</button>

            <div className="signin-signup">
                <p>Don't have an account ? <a href='/' className='signup-link'>Sign Up</a></p>
            </div>
            
        </div>
       
    </div>
  )
}

export default LoginSignUpContent