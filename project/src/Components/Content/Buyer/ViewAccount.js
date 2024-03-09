import { useNavigate } from 'react-router-dom';
import "./ViewAccountStyle.css";

function ViewAccount() {

    const navigate = useNavigate();

    const handleBack = async () => {

        navigate('/buyerdashboard');

    }

  return (
    
    <div className="va-main">

        <div className="va-sub-main">

            <div className='va-title'>
                <h1>View Account</h1>
                <div className='va-underline'></div>
            </div>


            <div className="va-shows">
                <p><strong>Token Name</strong> <span style={{marginLeft: "21px"}}>:  </span></p>
                <p><strong>Token Symbol</strong> <span style={{marginLeft: "10px"}}>:  </span></p>
                <p><strong>Total Supply</strong> <span style={{marginLeft: "22px"}}>:  </span></p>
            </div>

            <button className='va-btn' onClick={handleBack}>Back</button>

        </div>
       
    </div>
  )

}

export default ViewAccount;
