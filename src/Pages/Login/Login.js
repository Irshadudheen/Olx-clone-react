import React, { useState } from 'react';
import Logo from '../../olx-logo.png';
import {login,signup} from '../../firebase/config'
import './Login.css';

function Login() {
  const [signState,updateState]=useState('Log In')
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const user_auth=async event=>{
    event.preventDefault();
    if(signState==='Log In'){
      if(email.length===0||password.trim().length<6){
        return alert('give correct password')
      }
      await login(email,password);
    }else{
      if(name.length===0){
       return alert('pls enter name')
      }
      if(password.trim().length<6){
        return alert('pls enter atlest 6 letter password')
      }
      await signup(name,email,password);
    }
  }
  return (
    <div>
      <div className="loginParentDiv">
         <img width="200px" height="200px" alt='' src={Logo}></img>
        <form>

          {signState==="Sign up"?<><label htmlFor="name">Name</label>
          <br/>
          <input type="text" className='input' onChange={(e)=>setName(e.target.value)} />
          <br/></>:<></>}
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            onChange={(e)=>setEmail(e.target.value)} 
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            onChange={(e)=>setPassword(e.target.value)} 
            defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={user_auth}>{signState}</button>
        </form>
       {signState==='Log In' ?<a href='/'  onClick={(e)=>{updateState('Sign up');e.preventDefault()} }>Signup</a>:<a href='/'  onClick={(e)=>{updateState('Log In');e.preventDefault()} }>Log in</a>}
      </div>
    </div>
  );
}

export default Login;
