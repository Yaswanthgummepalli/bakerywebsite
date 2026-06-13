import React from 'react'
import './Register.css'
import {app,auth} from '../firebase'
import {useState} from 'react'
import {createUserWithEmailAndPassword} from "firebase/auth"
import {Link} from 'react-router-dom'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
function Register() {
  const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [errors,setErrors]=useState({})
    const handleSignup=async(e)=>{
      e.preventDefault();
      
        try{
            const error=validation();
            if(Object.keys(error).length===0)
            {
              await createUserWithEmailAndPassword(auth,email,password);
              await signOut(auth);

              alert("registration successful");
              navigate("/login");

            }
            else{
              setErrors(error);
            }
        }
        catch(error){
            console.log(error);
            alert("registration failed")
        }

    }
  

    const validation=()=>{
      const formerror={}
      if(password.trim()=="")
      {
        formerror.password="password is required";
      }
      else if(password.length<6)
      {
        formerror.password="password length should be greater than 6 characters"
      }
      return formerror;
    }
  return (
    <div className='signup-page'>
      <h1>Register Here</h1>
      <form onSubmit={handleSignup} className='signup-form'>
        
        <input type="email" placeholder="enter the Email:" value={email} onChange={((e)=>{setEmail(e.target.value)})}/>
        <input type="password" placeholder='enter password:' value={password} onChange={((e)=>{setPassword(e.target.value)})}/>
          {errors.password && <p>{errors.password}</p>}

            <button type='submit'>Sign Up</button>
            <p>if already sign Up? <Link to="/login"><strong>Log in</strong></Link></p>
      </form>
    </div>
  )
}

export default Register
