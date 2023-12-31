import { Component } from "react";
import "./HomeFixedContentStyle.css";

class HomeFixedContentData extends Component{
    render(){
        return(
            <div className={this.props.className}>
                <div className="des-text">
                    <h2>{this.props.heading}</h2>
                    <p>{this.props.text}</p>
                </div>
                <div className="des-img">
                    <img alt="/" src={this.props.img1}/>
                    <img alt="/" src={this.props.img2}/>
                </div>
            </div>
        )
    }
}

export default HomeFixedContentData;