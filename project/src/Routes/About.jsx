import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import Background from '../Components/Background/Background';
import Footer from '../Components/Footer/Footer';
import AboutContent from '../Components/Content/AboutContent';

function About() {
  return (
    <>
        <Navbar/>
        <Background
        className="background-mid"
        backgroundImg="https://images.unsplash.com/photo-1690321607902-d97c4b909a23?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"        
        title="About"
        btnClass="hide"
        />
        <AboutContent/>
        <Footer/>
    </>
  )
}

export default About