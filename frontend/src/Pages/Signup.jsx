import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const[toast, setToast] = useState('');

  const[name, setName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const handleSignup = async(e) => {
    e.preventDefault();
    setToast();
    try{
        const res = await fetch(`${backend_url}/api/user/signup`,{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({name, email, password})
        });
        const data = await res.json();
        if(res.ok){
            setToast(data.alert)
            setName('');
            setEmail('');
            setPassword('');
        }else{
            setToast(data.alert)
        }
    }catch(error){
        setToast(error.message);
    }
  }

  return (
    <div className='container mt-5 px-5' style={{backgroundColor:'#feaa56ff',borderRadius:'5px',padding:'25px',width:'500px'}}>
        <h2>Signup</h2>
        <div>
            <form onSubmit={handleSignup}>
                <span style={{color:'white'}}>Enter your Name:</span>
                <input type="text" placeholder='Fullname' value={name} onChange={e => setName(e.target.value)} style={{borderRadius:'5px',border:'1px solid gray',padding:'5px',width:'300px'}} />
                <br/>
                <span style={{color:'white'}}>Enter your email id:</span>
                <br/>
                <input type="text" placeholder='email id' value={email} onChange={e => setEmail(e.target.value)} style={{borderRadius:'5px',border:'1px solid gray',padding:'5px',width:'300px'}} />
                <br/>
                <span style={{color:'white'}}>Choose your password:</span>
                <br/>
                <input type="test" placeholder='password' value={password} onChange={e => setPassword(e.target.value)} style={{borderRadius:'5px',border:'1px solid gray',padding:'5px',width:'300px'}} />
                <br/>
                <button className='btn btn-danger btn-sm mt-2 text-center' type="submit">SIGNUP</button>
                <br/>
            </form>
            <br/>
            <Link to="/Login" >Already have an account? Login</Link>
        </div>
        <br/>
        {toast && <p style={{color:'white',textAlign:'center'}}>"{toast}"</p>}
    </div>
  )
}

export default Signup