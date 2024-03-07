import React from 'react'
import Navbar from '../../Components/Navbar/Financier/Navbar'
import Content from '../../Components/Content/Financier/SearchAwardID'
import { useLocation } from 'react-router-dom';

function SearchAwardID() {
  const location = useLocation();
  return (
    <div className='main-content'>
        <Navbar currentPage={location.pathname}/>  
        <Content/>
    </div>
  )
}

export default SearchAwardID