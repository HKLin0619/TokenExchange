import React from 'react'
import Navbar from '../../Components/Navbar/Buyer/Navbar'
import Content from '../../Components/Content/Buyer/PurchaseToken'
import { useLocation } from 'react-router-dom';

function PurchaseToken() {
  const location = useLocation();
  return (
    <div className='main-content'>
        <Navbar currentPage={location.pathname}/>  
        <Content/>
    </div>
  )
}

export default PurchaseToken