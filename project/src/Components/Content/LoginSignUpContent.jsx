import React from 'react';
import './LoginSignUpContentStyle.css'
import { useState } from 'react';

const LoginSignUpContent = () => {

    const [action,setAction] = useState("Sign Up");

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action==="Login"?<div></div>:                
                <div className='input'>
                    <i className='fa-solid fa-user'/>
                    <input type='text' placeholder='Username'/>
                </div>}

                <div className='input'>
                    <i className='fa-solid fa-envelope'/>
                    <input type='email' placeholder='Email'/>
                </div>
                <div className='input'>
                    <i className='fa-solid fa-lock'/>
                    <input type='password' placeholder='Password'/>
                </div>
            </div>
            {action==="Sign Up"?<div></div>:  
            <div className='forgot-password'>Lost Password ? <span>Click Here !</span></div>}
                <div className='submit-container'>
                    <button className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}>Sign Up</button>
                    <button className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</button>
                </div>

        </div>
    )
}

export default LoginSignUpContent