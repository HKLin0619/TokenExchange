import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Routes/Login';
import AdminDashboard from './Routes/Admin/Dashboard';
import BuyerDashboard from './Routes/Buyer/Dashboard';
import FinancierDashboard from './Routes/Financier/Dashboard'
import MintToken from './Routes/Admin/MintToken';
import ViewToken from './Routes/Admin/viewToken';

function App() {

  // return (
  //   <LoginSignUp/>
  // )
  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/buyerdashboard' element={<BuyerDashboard/>}/>
        <Route path='/financierdashboard' element={<FinancierDashboard/>}/>
        <Route path='/MintToken' element={<MintToken/>}/>
        <Route path='/viewToken' element={<ViewToken/>}/>
      </Routes>
    </>
  )

}

export default App