import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'
function Footer() {
  return (
    <div className="footer-main">
      <div className='bakeryname'>
        <p id='name'>Lakshimi bakery</p>
        <p>store</p>
        <p >making life sweeter, one</p>
        <p>bite at a time</p>

      </div>
      <div className='links'>
        <p>Quick links</p>
        <ul className='linktag'>
          <Link to='/'>Home</Link>
          <Link to='/About'>About</Link>
          <Link to="/Menu">Menu</Link>
          <Link to='/contact'>Contact</Link>
        </ul>
      </div>
      <div className='contact'>
        <h4>Contact us</h4>
        <p>+123 4567 8900</p>
        <p>lakshmibakery@gmail.com</p>
      </div>
     
    </div>
  )
}

export default Footer
