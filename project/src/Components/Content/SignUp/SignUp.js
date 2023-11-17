import React, { useState } from 'react'
import { UserTypeMenuItems } from "../SignUp/DropDownList";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "./SignUpStyle.css";

function SignUp() {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedUserType, setSelectedUserType] = useState('Roles');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleUserTypeSelect = (userType) => {
        setSelectedUserType(userType);
        setIsOpen(false);
    };

    const handleSignUp = async () => {

        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({userType:selectedUserType,username,email,password,confirmPassword}),
        });

        const data = await response.json();

        console.log(data);

        if (data.success) {

            console.log("registerSuccessfully");

            navigate('/?success=true');

        } else {

            if (data.errorType === 'usernameTaken') {

                console.log("usernameTaken");

                toast.error('Username is already registered !', {
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

            } else if (data.errorType === 'userType') {

                console.log("userType");

                toast.error('Please select user type !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (data.errorType === 'username') {

                console.log("username");

                toast.error('Please enter username !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (data.errorType === 'email') {

                console.log("email");

                toast.error('Please enter email !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (data.errorType === 'password') {

                console.log("password");

                toast.error('Please enter password !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (data.errorType === 'confirmPassword') {

                console.log("confirmPassword");

                toast.error('Please enter confirm password !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (data.errorType === 'passwordInconsistency') {

                console.log("passwordInconsistency");

                toast.error('Inconsistent passwords !', {
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
                setConfirmPassword('');

            } else {

                console.log("signUpFail");

                toast.error('Sign Up failed !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                setSelectedUserType('Roles');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

            }

        }

    }
 
  return (
    
    <div className="sign-up-main">

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

        <div className="sign-up-sub-main">

            <div className='sign-up-title'>
                <h1>Sign Up</h1>
                <div className='sign-up-underline'></div>
            </div>

            <div className='sign-up-inputs'>

                <div className='sign-up-drop-down'>

                    <button onClick={() => setIsOpen((prev) => !prev)} className='sign-up-drop-down-btn'>   
                        {selectedUserType}
                        {!isOpen ?(
                            <i className="fa-solid fa-caret-down"></i>                      
                        ) : (
                            <i className="fa-solid fa-caret-up"/>
                        )}     
                    </button>

                    {isOpen && <div className='sign-up-drop-down-contents'>
                        {UserTypeMenuItems.map((item, index) => {
                            return(
                                <div onClick={() => handleUserTypeSelect(item.title)} className='sign-up-drop-down-content' key={index}>
                                    <div className='sign-up-drop-down-title'>{item.title}</div>
                                </div>
                            );
                        })}
                    </div>}

                </div>

                <div className='sign-up-input'>
                    <i className="fa-solid fa-user"/>
                    <input
                        type="text" 
                        placeholder="Username" 
                        className="name" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)}
                        />
                </div>

                <div className='sign-up-input'>
                    <i className="fa-solid fa-envelope"/>
                    <input
                        type="text" 
                        placeholder="Email" 
                        className="name" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                </div>

                <div className='sign-up-input'>
                    <i className="fa-solid fa-lock"/>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        className="name"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                </div>

                <div className='sign-up-input'>
                    <i className="fa-solid fa-lock"/>
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className="name"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                </div>
            </div>

            <button onClick={handleSignUp} className='sign-up-btn'>Register</button>

            <div className="sign-up">
                <p>Already have an account ? <a href='/' className='sign-in-link'>Login</a></p>
            </div>
            
        </div>
       
    </div>
  )
}

export default SignUp