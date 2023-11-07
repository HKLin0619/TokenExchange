import "./FirstColumnStlye.css"

function FirstColumn(props) {
  return (

    <div className='first-column'>

        <div className="first-card">

            <div className="f-title">
                <h1>Profile</h1>
                <div className="f-underline"></div>
            </div>

            <div className="f-content">
                
                <div className="f-item  ">
                    <span className="label">Name:</span>
                    <span className="value">Heng Kang Lin</span>
                </div>

                <div className="f-item  ">
                    <span className="label">Email:</span>
                    <span className="value">admin@gmail.com</span>
                </div>

                <div className="f-item  ">
                    <span className="label">User Type:</span>
                    <span className="value">Admin</span>
                </div>

            </div>

        </div>

        <div className="secound-card">

            <div className="s-title">
                
            </div>
        </div>
        
    </div>

  )
}

export default FirstColumn