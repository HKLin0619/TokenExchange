import { useNavigate } from 'react-router-dom';
import "./FundingStatusStyle.css";

function FundingStatus() {

    const navigate = useNavigate();

    const handleBack = async () => {

        navigate('/financierdashboard/searchAwardID');

    }

  return (
    
    <div className="fa-main">

        <div className="fa-sub-main">

            <div className='fa-title'>
                <h1>Funding Status</h1>
                <div className='vt-underline'></div>
            </div>


            <div className="fa-shows">
                <p><strong>AwardID</strong> <span style={{marginLeft: "96px"}}>:  </span></p>
                <p><strong>SupplierID</strong> <span style={{marginLeft: "82px"}}>:  </span></p>
                <p><strong>Award Amount (RM)</strong> <span style={{marginLeft: "5px"}}>:  </span></p>
                <p><strong>Document (IPFS)</strong> <span style={{marginLeft: "35px"}}>:  </span></p>
                <p><strong>Document Hash</strong> <span style={{marginLeft: "41px"}}>:  </span></p>
                <p><strong>Status is Funded</strong> <span style={{marginLeft: "39px"}}>:  </span></p>
            </div>

            <button className='fa-btn' onClick={handleBack}>Back</button>

        </div>
       
    </div>
  )

}

export default FundingStatus;
