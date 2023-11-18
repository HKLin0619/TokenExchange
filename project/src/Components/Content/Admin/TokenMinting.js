import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "./TokenMintingStyle.css";

function TokenMinting() {

    const [tokenSymbol, setTokenName] = useState('');
    const [numberOfToken, setNumberOfToken] = useState('');
    const navigate = useNavigate();
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    const handleSubmit = async () => {

        const response = await fetch('/tokenminting', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({tokenSymbol,numberOfToken}),
        });

        const data = await response.json();

        console.log(data);

        if (data.success) {

            console.log("tokenMintingSuccessfully");
            navigate('/admindashboard?success=true', storedUserData);
            
        } else {

            if (data.errorType === 'tokenSymbol') {

                console.log("tokenSymbol");

                toast.error('Please enter token Nname !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (data.errorType === 'tokenName') {

                console.log("tokenName");

                toast.error('Token Name not found !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (data.errorType === 'numberOfToken') {

                console.log("numberOfToken");

                toast.error('Please enter number of token !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });


            } else if (data.errorType === 'numberError') {

                console.log("numberError");

                toast.error('Please enter number format !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else {

                console.log("tokenMintingFail");

                toast.error('Token Minting failed !', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            }

        }

    }

  return (
    
    <div className="tm-main">

        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />

        <div className="tm-sub-main">

            <div className='tm-title'>
                <h1>Token Minting</h1>
                <div className='tm-underline'></div>
            </div>

            <div className='tm-inputs'>
                <div className='tm-input'>
                    <i className="fa-solid fa-coins"/>
                    <input
                        type="text" 
                        placeholder="Token Name (ERC20)" 
                        className="tm-name"
                        value={tokenSymbol}
                        onChange={(e) => setTokenName(e.target.value)}/>
                </div>

                <div className='tm-input'>
                    <i className="fa-solid fa-plus"/>
                    <input 
                        type="text" 
                        placeholder="Number of Tokens" 
                        className="tm-name"
                        value={numberOfToken}
                        onChange={(e) => setNumberOfToken(e.target.value)}/>
                </div>
            </div>

            <button className='tm-btn' onClick={handleSubmit}>Submit</button>

        </div>
       
    </div>
  )
}

export default TokenMinting