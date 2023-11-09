import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Routes/Login';
import AdminDashboard from './Routes/Admin/Dashboard';
import BuyerDashboard from './Routes/Buyer/Dashboard';
import FinancierDashboard from './Routes/Financier/Dashboard'
import TokenMinting from './Routes/Admin/TokenMinting';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/buyerdashboard' element={<BuyerDashboard/>}/>
        <Route path='/financierdashboard' element={<FinancierDashboard/>}/>
        <Route path='/tokenminting' element={<TokenMinting/>}/>
      </Routes>
    </>
  )

}

export default App