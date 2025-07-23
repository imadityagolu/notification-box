import React, { useState } from 'react'

function SendMessage() {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const[toast, setToast] = useState('');

  const[name, setName] = useState('');
  const[message, setMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    setToast();
    try{
      const res = await fetch(`${backend_url}/api/message/add`,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({name, message})
      });
      const data = await res.json();
      if(res.ok){
        setToast(data.alert);
        setName('');
        setMessage('');
      }else{
        setToast(data.alert);
      }
    }
    catch(error){
      setToast(error.message);
    }
  }

  return (
    <div className='container bg-warning p-5 mt-5' style={{border:'1px solid gray',borderRadius:'5px'}}>
      <h4 className='text-white'>Send Message !!</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Your Name' value={name} onChange={e => setName(e.target.value)} style={{border:'1px solid gray',borderRadius:'5px',padding:'3px 10px'}} />
        <br/>
        <textarea placeholder='type your message here...' value={message} onChange={e => setMessage(e.target.value)} style={{width:'400px',height:'100px',border:'1px solid gray',borderRadius:'5px',padding:'10px'}}></textarea>
        <br/>
        <button type='submit' className='btn btn-sm bg-danger text-white'>send message</button>
      </form>
      {toast && <p style={{marginTop:'20px',textAlign:'center',color:'red'}}>{toast}</p>}
    </div>
  )
}

export default SendMessage