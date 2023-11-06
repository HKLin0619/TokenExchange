import React from 'react'
import Navbar from '../../Components/Navbar/Admin/Navbar'
import FirstColumnContent from '../../Components/Content/FirstColumn'
import '../Background.css'

function Dashboard() {
  return (
    <div className='main-content'>
        <Navbar/>  
        <FirstColumnContent/>
    </div>
  )
}

export default Dashboard