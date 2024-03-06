import React from 'react'
import Content from '../../Components/Content/Financier/FundingStatus'
import { useLocation } from 'react-router-dom';

function FundingStatus() {
  const location = useLocation();
  return (
    <div className='main-content'>
        <Content/>
    </div>
  )
}

export default FundingStatus