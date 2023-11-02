import React from 'react';
import LoginSignUp from './Routes/LoginSignUp';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminHome from './Routes/Admin/Home';

function App() {

  // return (
  //   <LoginSignUp/>
  // )
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginSignUp/>} />
          <Route path="/admin" element={<AdminHome/>} />
        </Routes>
      </BrowserRouter>
    </div>
);
}

export default App