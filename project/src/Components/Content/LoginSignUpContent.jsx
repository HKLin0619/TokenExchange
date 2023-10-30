import React from 'react'
import "./LoginSignUpContentStyle.css"

function LoginSignUpContent() {
    const [signIn, toggle] = React.useState(true);
    return (
        <div className='Container'>
            <div className='SignUpContainer' signinIn={signIn}>
                <div className='Form'>
                    <h1>Create Account</h1>
                    <input type='text' placeholder='Name'/>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Password'/>=
                    <button>Sign Up</button>
                </div>
            </div>

            <div className='SignInContainer' signinIn={signIn}>
                <div className='Form'>
                    <h1>Sign in</h1>
                    <input type='email' placeholder='Email'/>
                    <input type='password' placeholder='Password'/>
                    <div className='forgot-password'>Forgot your password ?</div>
                    <button>Sign In</button>
                </div>
            </div>

            <div className='OverlayContainer' signinIn={signIn}>
                <div className='Overlay' signinIn={signIn}>
                    <div className='LeftOverlayPanel' signinIn={signIn}>
                        <h1>Welcome Back!</h1>
                        <p>To keep connected with us please login with your personal info</p>
                        <button className='GhostButton' onClick={() => toggle(true)}>Sign In</button>
                    </div>

                    <div className='RightOverlayPanel' signinIn={signIn}>
                        <h1>Hello, Friend!</h1>
                        <p>Enter Your personal details and start journey with us</p>
                        <button className='GhostButton' onClick={() => toggle(false)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUpContent