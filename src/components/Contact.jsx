import React from 'react'
import './Contact.css'
import cake from '../assets/kaouther-djouada-hcEDfkiVmMI-unsplash.jpg'
function Contact() {
  return (
    <div className='ram'>
      <div className='c-top'>
            <div className='c-top-1'>
               <h1>Contact Us</h1>
               <p>we'd love to hear from you! whether you have any question,<br />
               feedback or a special request,feel free to reach out.</p>
               <p>We're here to help!</p>

            </div>
            <div className='c-top-2'>
                <img src={cake} alt="" />
            </div>
         

      </div>
      <div className='c-bottom'>
        <h1>Get In Touch</h1>
        <div className='c-bottom-1'>
          <div className='c-bottom-1-1'>
            <img src={cake} alt="" />
            <div>
              <h2>Our location</h2>
              <p>123 bakery street,sweet city<br/>Ca 6587,usa</p>
            </div>
          </div>
          <div className='c-bottom-1-1'>
            <img src={cake} alt="" />
            <div>
              <h2>Phone</h2>
              <p>+1 1332465648490587</p>
            </div>

          </div>
          <div className='c-bottom-1-1'>
            <img src={cake} alt="" />
            <div>
              <h2>Email</h2>
              <p>abc@gmail.com</p>

            </div>
          </div>
          <div className='c-bottom-1-1'>
            <img src={cake} alt="" />
            <div>
              <h2>Opening Hours</h2>
              <p>Monday-Saturday: 7:00 AM-8:00 PM <br />Sunday : 8:00 AM -6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
