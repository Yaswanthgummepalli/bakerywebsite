import React from 'react'
import './About.css'
import bakery from '../assets/bakery.webp'
import cake from '../assets/cake.jpg'
import {Link} from 'react-router-dom'
function About() {
  return (
    <div>
      <h1 className='About'>About Us</h1>
      <div className='about-top'>
        <div className='top-1'>
          <img src={bakery} alt="" />
        </div>
        <div className='top-2'>
          <h1 className='top-2-h'>Baking Moments <br/>Of Joy Since 2010</h1>
          <p>All sweet delight Bakery,we believe every recipe has a story and 
          every bite brings happiness. we
          use finest ingridients and bake everything with passiong and love
          </p>
          <p className='top-2-b'>Fresh Ingredients</p>
          <p className='top-2-b'>Made with love</p>
          <p className='top-2-b'>Hygienic and Quality</p>
          <p className='top-2-b'>Customer Satisfaction</p>

        </div>
      </div>
      <div className="about-below">
        <div className='below-1'>
          <h1>Our Story</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus facilis, 
            obcaecati rem incidunt quas unde consectetur consequuntur?
             Aliquid, fuga optio laborum culpa quam autem neque dolores quia 
             maiores voluptates laboriosam!</p>
          <Link to="/Menu"><button className='about-button'>Explore menu</button>   </Link>
        </div>
        <div>
          <img src={cake} alt="" />
        </div>
      </div>
    </div>
  )
}

export default About



