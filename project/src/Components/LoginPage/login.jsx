import React from 'react'
import './login.css'
import { UilUser, UilLock } from '@iconscout/react-unicons'

export const login = () => {

  return (
    <div className='container'>

      <div className='header'>
        <div className='text'>Login</div>
        <div className='underline'></div>
      </div>

      <div className='inputs'>
        <div className='input' >
          <div className='icon'><UilUser/></div>
          <input type='text' placeholder='Username'/>
        </div>

        <div className='input' >
        <div className='icon'><UilLock/></div>
          <input type='password' placeholder='Password'/>
        </div>

      </div>

      <div className='forgot-password'>Forgot Password ?</div>

      <div className='submit-container'>
        <div className='submit'>Login</div>
      </div>

    </div>

    
  )
}

export default login

