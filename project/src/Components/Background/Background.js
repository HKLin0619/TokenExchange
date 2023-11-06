import React from 'react'
import "./Background.css";

export default function Background(props) {
  return (
    <div className={props.className}>
        <img alt='/' src={props.backgroundImg}/>
    </div>
  )
}
