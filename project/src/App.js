import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Routes/Login';
import Dashboard from './Routes/Admin/Dashboard';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admindashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )

}

export default App