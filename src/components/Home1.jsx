import React from 'react'
import './Home1.css'
import cake from '../assets/stephen-wheeler-LRIQuZyxKRM-unsplash.jpg'
import {Link } from 'react-router-dom'
function Home1() {
  return (
    <div id='top-section'>
      <div id="top-section-left">
        <p id="first">Freshly baked</p>
        <p id="second">Happiness<br></br>Every Day</p>
        <p id="third">cakes,pastries and breads<br></br>made with love</p>
        <Link to="/Menu"><button id="ts-button" >explore menu  </button></Link>
        
       
      </div>
      <div id="top-section-right">
        <img src={cake} alt="" className='img'/>
      </div>
    </div>
  )
}

export default Home1
