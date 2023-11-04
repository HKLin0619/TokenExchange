import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./LoginContentStyle.css";

function LoginSignUpContent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {

        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({ username,password }),
        });

        const data = await response.json();

        console.log(data);

        if (!username && !password) {
            toast.error('Enter username and password !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {

            if (data.success) {
                const userType = data.userType;
                navigate(`/${userType}dashboard`);
            } else {
                if (data.errorType === 'username') {
                    toast.error('Your username is incorrect !', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setUsername('');
                    setPassword('');
                } else if (data.errorType === 'password') {
                    toast.error('Your password is incorrect !', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setPassword('');
                } else {
                    toast.error('Login failed !', {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                    setUsername('');
                    setPassword('');
                }
            }

        }

    }

  return (
    
    <div className="main">

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

        <div className="sub-main">

            <div className='title'>
                <h1>ERC 20 Token Exchange</h1>
                <div className='underline'></div>
            </div>

            <div className='inputs'>
                <div className='input'>
                    <i className="fa-solid fa-user"/>
                    <input
                        type="text" 
                        placeholder="Username" 
                        className="name" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}/>
                </div>

                <div className='input'>
                    <i className="fa-solid fa-lock"/>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="name"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>

            <div className='forgot-remember'>
                <label><input type='checkbox'/>Remember Me</label>
                <a href="/">Forgot password ?</a>
            </div>

            <button className='btn' onClick={handleLogin}>Login</button>

            <div className="signin-signup">
                <p>Don't have an account ? <a href='/' className='signup-link'>Sign Up</a></p>
            </div>
            
        </div>
       
    </div>
  )
}

export default LoginSignUpContent