import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

function Login() {

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [msg, setMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    setMsg('');
    try{
        const res = await fetch(`${backend_url}/api/user/login`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

    if(res.ok && data.user){
        
          if (data.user.name) localStorage.setItem('userName', data.user.name);
          if (data.user.email) localStorage.setItem('userEmail', data.user.email);
          toast.success(`Welcome, ${data.user.name || 'user'}!`);
          
          setEmail('');
          setPassword('');
        navigate("/SendMessage");
    }else{
        toast.error(data.alert || "Login Failed");
    }

    }catch(error){
        setMsg(error.message);
    }
  }

  return (
    <div className='container mt-5 px-5' style={{backgroundColor:'skyblue',borderRadius:'5px',padding:'25px',width:'500px'}}>
        <h2>Login</h2>
        <div>
            <form onSubmit={handleLogin}>
                <span style={{color:'white'}}>Enter your email id:</span>
                <br/>
                <input type="text" placeholder='email id' onChange={e => setEmail(e.target.value)} style={{borderRadius:'5px',border:'1px solid gray',padding:'5px',width:'300px'}} />
                <br/>
                <span style={{color:'white'}}>Enter your password:</span>
                <br/>
                <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} style={{borderRadius:'5px',border:'1px solid gray',padding:'5px',width:'300px'}} />
                <br/>
                <button className='btn btn-danger btn-sm mt-2 text-center' type="submit">Login</button>
                <br/>
            </form>
            <br/>
            <Link to="/Signup" >Don't have an account? Signup</Link>
        </div>
        <br/>
        {msg && <p style={{color:'white',textAlign:'center'}}>"{msg}"</p>}
    </div>
  )
}

export default Login