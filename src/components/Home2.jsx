import React from 'react'
import './Home2.css'
import cake from '../assets/cake.jpg'
import puff from '../assets/mia-truong-5C0ev9m9lbo-unsplash.jpg'
import cake2 from '../assets/jacob-thomas-6jHpcBPw7i8-unsplash.jpg'
import sweet from '../assets/Screenshot 2026-06-24 201531.png';
function Home2() {
    const items=[{image:cake, name:'cake', price:"300"},
                {image:puff,name:'puff',price:"20"},
                {image:cake2,name:'chocolate cake',price:"200"},
            {image:sweet,name:"sweets",price:"80"}]
  return (
    <div className='home2'>
      <h1 id="heading">Our Bestsellers</h1>
      
      <div id="grid">
        {items.map((item,index)=>{
            return(
            <div className='card' key={index}>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.price}</p>
                
                </div>
            )
        })}
      </div>
     

    </div>
  )
}

export default Home2
