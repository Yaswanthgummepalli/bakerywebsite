import React from 'react'
import './Home2.css'
import cake from '../assets/cake.jpg'
function Home2() {
    const items=[{image:cake, name:'chocolate cake', price:"50"},
                {image:cake,name:'red velvet',price:"100"},
                {image:cake,name:'cupcake',price:"120"},
            {image:cake,name:"cupcake",price:"80"}]
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
