import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Admin/Navbar';
import "./MintTokenStyle.css";

function MintToken() {
    const [formData, setFormData] = useState({
        tokenSymbol: '',
        noOfToken: '',
    });

    const handleInputChange = (e) => {    
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault()
      const response = await fetch('/web3/mintToken', {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/json',
          },
          body: JSON.stringify(formData),
      }).then(res => res.json())

      if(response.status === 200){
        console.log(response.message)
      } else {
        console.log(response.message)
      }
    }

    return (
        <>
            <Navbar />
            <div class="container">
              <div class="d-flex flex-column mb-3">
                <form onSubmit={handleSubmit}>
                  <div class="p-2 row">
                      <label for="tokenSymbol" class="text-label col-sm-3">Token Name:</label>
                      <input
                          type="text"
                          id="tokenSymbol"
                          name="tokenSymbol"
                          placeholder="Token Name"
                          value={formData.tokenSymbol}
                          onChange={handleInputChange}
                          class="col-sm-4"
                      />
                  </div>
                  <div class="p-2 row">
                      <label for="noOfToken" class="text-label col-sm-3">Number of Tokens:</label>
                      <input
                          type="text"
                          id="noOfToken"
                          name="noOfToken"
                          placeholder="Input 2"
                          value={formData.noOfToken}
                          onChange={handleInputChange}
                          class="col-sm-4"
                      />
                  </div>
                  <button type='submit'>Submit</button>
                </form>
              </div>
          </div>
        </>
    );
}

export default MintToken;
