import "./SelectContentStlye.css"
import SelectContentData from "./SelectContentData";

function SelectContent() {
  return (
    <div className='selectContent'>
        <h1>Tittle</h1>
        <p>This is some description put in here</p>
        
        <div className="content-card">
            <SelectContentData
            img="https://images.unsplash.com/photo-1698069005894-f01747b3f152?auto=format&fit=crop&q=80&w=2020&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading="Tittle 1"
            text="Description"
            />

            <SelectContentData
            img="https://images.unsplash.com/photo-1697208254530-eb42576be354?auto=format&fit=crop&q=80&w=1972&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading="Tittle 2"
            text="Description"
            />

            <SelectContentData
            img="https://images.unsplash.com/photo-1695849118500-c8034bc651b6?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            heading="Tittle 3"
            text="Description"
            />
        </div>
    </div>
  )
}

export default SelectContent