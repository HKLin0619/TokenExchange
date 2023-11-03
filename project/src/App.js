import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Routes/Login';
import AdminDashboard from './Routes/Admin/Dashboard';
import BuyerDashboard from './Routes/Buyer/Dashboard';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/buyerdashboard' element={<BuyerDashboard/>}/>
      </Routes>
    </>
  )

}

export default App