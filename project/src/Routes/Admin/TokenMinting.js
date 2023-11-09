import React from 'react'
import Navbar from '../../Components/Navbar/Admin/Navbar'
import Content from '../../Components/Content/Admin/TokenMinting'
import '../Background.css'

function Dashboard() {
  return (
    <div className='main-content'>
        <Navbar/>  
        <Content/>
    </div>
  )
}

export default Dashboard