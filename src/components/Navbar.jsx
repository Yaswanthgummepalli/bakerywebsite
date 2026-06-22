import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import {auth} from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function Navbar({user}) {

  const navigate=useNavigate();
  const handleLogout=async()=>{
    await signOut(auth);
    navigate('/')
    alert("Logout successful");
  }
  return (
    <div>

  
    <div className='navbar'>
      <div className='nav-sec-1'>
        <h2 className='head'>lakshmi bakery</h2>
        <p className='store'>     store</p>
      </div>
      <nav className='nav-contents'>
          <Link to='/' className='links'>Home</Link>
          <Link to='/About' className='links'>About</Link>
          <Link to="/Menu" className='links'>Menu</Link>
          <Link to='/contact' className='links'>Contact</Link>
          {(user?.email===process.env.REACT_APP_ADMIN || user?.email===process.env.REACT_APP_DEMO_EMAIL ) && <Link to="/orderslist" className='links'>Orderslist</Link>}
      </nav>
      <div className='register-login'>
      {user && (<Link to="/order"><button  className='order-btn'>order now</button></Link>)}
        {user ?(
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
      ):(
        <div ><Link to="/login"><button className='login-btn'>login</button></Link>
        <Link  to="/register"><button className='register-btn'>register</button></Link>
        
        </div>
      )}
    </div>

       
    </div>
   </div>
  )
}

export default Navbar

