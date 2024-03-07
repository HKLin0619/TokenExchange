import { useNavigate } from 'react-router-dom';
import "./SearchAwardIDStyle.css";
import { Space, Table} from 'antd';

function SearchAwardID() {

    const navigate = useNavigate();

    const handleBack = async () => {

        navigate('/financierdashboard');

    }

    const handleSearch = async () => {

        navigate('/financierdashboard/fundingStatus');

    }

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
              <button className='sa-btn-search' onClick={handleSearch}>Search</button>
            </Space>
          ),
          align: 'center',
          width: 150,
        },
      ];
      const data = [
        {
            no: '1',
            awardID: '123123123',
        },
        {
            no: '2',
            awardID: '12312312',
        },
        {
            no: '3',
            awardID: '14212412',
        },
        {
            no: '4',
            awardID: '14212412',
        },
        {
            no: '5',
            awardID: '14212412',
        },
        {
            no: '6',
            awardID: '14212412',
        },
      ];

  return (
    
    <div className="sa-main">

        <div className="sa-sub-main">

            <div className='sa-title'>
                <h1>Search Award ID</h1>
                <div className='sa-underline'></div>
            </div>


            <div className="sa-table">

                <Table columns={columns} dataSource={data} pagination = {{pageSize : 3}} bordered={true}/>

            </div>

            <button className='sa-btn' onClick={handleBack}>Back</button>

        </div>
       
    </div>
  )

}

export default SearchAwardID;
