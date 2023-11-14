import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Routes/Login';
import AdminDashboard from './Routes/Admin/Dashboard';
import BuyerDashboard from './Routes/Buyer/Dashboard';
import FinancierDashboard from './Routes/Financier/Dashboard'
import TokenMinting from './Routes/Admin/TokenMinting';
import ViewToken from './Routes/Admin/ViewToken';
import SignUp from './Routes/SignUp';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admindashboard' element={<AdminDashboard/>}/>
        <Route path='/buyerdashboard' element={<BuyerDashboard/>}/>
        <Route path='/financierdashboard' element={<FinancierDashboard/>}/>
        <Route path='/admindashboard/tokenminting' element={<TokenMinting/>}/>
        <Route path='/admindashboard/viewtoken' element={<ViewToken/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </>
  )

}

export default App