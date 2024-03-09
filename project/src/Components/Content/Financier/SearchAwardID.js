import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SearchAwardIDStyle.css";
import { Space, Table} from 'antd';

function SearchAwardID() {
<<<<<<< HEAD
    const [userid, setUserID] = useState('');
    const [awardid, setAwardID] = useState('');
    const [supplierid, setSupplierID] = useState('');
    const [awardamount, setAwardAmount] = useState('');
    const [documenthash, setDocumentHash] = useState('');
    const [fundstatus, setFundStatus] = useState('');
=======
>>>>>>> KangLin
    const navigate = useNavigate();
    const [awardIDs, setAwardIDs] = useState([]);

<<<<<<< HEAD
    const handleBack = async () => {
        navigate("/financierdashboard/searchaward");
      };
    
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paramAwardID = searchParams.get("awardID");
        fetchAwardID(paramAwardID);
    }, [location.search]);

   const fetchAwardID = async (paramAwardID) => {
    try {
        const response = await fetch("/searchawardid?awardid=" + paramAwardID, {
            method: "GET",
        });
        const result = await response.json();
        console.log(result);

        if (response.status === 200) {
            const awardData = result.data[0];
            setUserID(awardData.buyerid || ''); 
            setAwardID(awardData.awardid || '');
            setSupplierID(awardData.supplierid || '');
            setAwardAmount(awardData.awardamount || '');
            setDocumentHash(awardData.award_doc_hash || '');
            setFundStatus(awardData.funded_ind || '');
        } else {
            console.error("Failed to fetch award ID:", result.message);
        }
    } catch (error) {
        console.error("Error fetching award ID:", error);
=======
    const handleBack = () => {
        navigate('/financierdashboard');
>>>>>>> KangLin
    }

    useEffect(() => {
        fetchAwardIDs();
    }, []);

    const fetchAwardIDs = async () => {
        try {
            const response = await fetch("/searchAwardID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Request failed with status: " + response.status);
            }

            const data = await response.json();
            console.log(data);

            if (data.status === 200) {
                setAwardIDs(data.awardIDs); // Set award IDs in state
            } else {
                console.log("No matching awardID found.");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearch = (awardID) => {
        navigate(`/financierdashboard/searchawardid?awardID=${awardID}`);
    };

    const columns = [
        {
          title: 'No.',
          dataIndex: 'no',
          key: 'no',
          width: 70,
          align: 'center',
        },
        {
          title: <div style={{ textAlign: 'center' }}>Award ID</div>,
          dataIndex: 'awardID',
          key: 'awardID',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <button className='sa-btn-search' onClick={() => handleSearch(record.awardID)}>Search</button>
            </Space>
          ),
          align: 'center',
          width: 150,
        },
    ];

    const data = awardIDs.map((awardID, index) => ({ no: index + 1, awardID }));

    return (
        <div className="sa-main">
            <div className="sa-sub-main">
                <div className='sa-title'>
                    <h1>Search Award ID</h1>
                    <div className='sa-underline'></div>
                </div>
                <div className="sa-table">
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} bordered={true} />
                </div>
                <button className='sa-btn' onClick={handleBack}>Back</button>
            </div>
        </div>
    );
}

export default SearchAwardID;
