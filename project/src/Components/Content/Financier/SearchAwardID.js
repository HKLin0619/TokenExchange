import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SearchAwardIDStyle.css";
import { Space, Table} from 'antd';

function SearchAwardID() {
    const navigate = useNavigate();
    const [awardIDs, setAwardIDs] = useState([]);

    const handleBack = () => {
        navigate('/financierdashboard');
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
