import React from 'react'
import './Login.css'
import {auth} from '../firebase'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth,email,password);
            alert("login successful");
            navigate('/');
        }
        catch(error){
            alert ("login failed");
        }

    }
  return (
    <div className='login'>
        <div className='login-page'>
            <form onSubmit={handleLogin} className='login-form'>
                <input type="email" placeholder='enter email:' value={email} onChange={((e)=>{setEmail(e.target.value)})}  />
                <input type="password" placeholder='enter password:' value={password} onChange={((e)=>{setPassword(e.target.value)})} />
                <button type="submit">Log in</button>
                <p>if not registered? <Link to="/register"><strong>Sign Up</strong></Link></p>
            </form>

        </div>
    </div>
  )
}

export default Login
