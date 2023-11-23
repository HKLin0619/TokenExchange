import React from 'react'
import Navbar from '../../Components/Navbar/Buyer/Navbar'
import Content from '../../Components/Content/Buyer/UploadTenderAwards'
import { useLocation } from 'react-router-dom';

function UploadTenderAward() {
  const location = useLocation();
  return (
    <div className='main-content'>
        <Navbar currentPage={location.pathname}/>  
        <Content/>
    </div>
  )
}

export default UploadTenderAward