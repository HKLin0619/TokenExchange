import React from 'react'
import "./SampleBackgroudStyle.css";

export default function Background(props) {
  return (
    <div className={props.className}>
        <img alt='/' src={props.backgroundImg}/>
        <div className='background-text'>
            <h1>{props.title}</h1>
            <p>{props.text}</p>
            <a href={props.url} className={props.btnClass}>{props.btnText}</a>
        </div>
    </div>
  )
}
