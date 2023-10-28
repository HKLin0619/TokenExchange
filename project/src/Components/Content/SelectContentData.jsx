import "./SelectContentStlye.css"

function SelectContentData(props) {
  return (
    <div className="c-card">
        <div className="c-image">
            <img src={props.img} alt="/"/>
        </div>
        <h4>{props.heading}</h4>
        <p>{props.text}</p>
    </div>
  )
}

export default SelectContentData