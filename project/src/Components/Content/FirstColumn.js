import "./FirstColumnStlye.css"

function FirstColumn(props) {
  return (

    <div className='first-column'>

        <div className="first-card">

            <div className="f-title">
                <h1>Profile</h1>
                <div className="f-underline"></div>
            </div>

            <div className="f-contents">
                
                <div className="f-content">
                    <p>User Type : Admin</p>
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