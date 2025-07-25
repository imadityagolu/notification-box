import React, { useState, useEffect } from 'react'
import Admin from './Admin';

function SendMessage() {
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const [toast, setToast] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [senderEmail, setSenderEmail] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedName) {
      setName(storedName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
      setSenderEmail(storedEmail);
    }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
    setToast();
    try{
      const res = await fetch(`${backend_url}/api/message/add`,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email: recipientEmail, senderEmail, message})
      });
      const data = await res.json();
      if(res.ok){
        setToast(data.alert);
        setMessage('');
      }else{
        setToast(data.alert);
      }
    }
    catch(error){
      setToast(error.message);
    }
  }

  const fetchUsers = () => {
    fetch(`${backend_url}/api/user/list?email=${encodeURIComponent(senderEmail)}`)
    .then(res => res.json())
    .then(data => { setAllUsers(Array.isArray(data) ? data : data.users || []);})
    .catch((error) => { setToast(error.message)});
  };
  useEffect(() => {fetchUsers();}, [senderEmail]);

  return (
    <>
    <Admin/>
    <div className='container mt-5 px-5' style={{backgroundColor:'#f79e29ff',borderRadius:'5px',padding:'25px',width:'500px'}}>
      <h4 className='text-white'>Send Message !!</h4>
      <br/>
      <form onSubmit={handleSubmit}>
        <select
          value={recipientEmail}
          onChange={e => setRecipientEmail(e.target.value)}
          style={{border:'1px solid gray',borderRadius:'5px',padding:'3px 10px'}}
        >
          <option value="" disabled>--Select--</option>
          <option value="all">ALL</option>
          {Array.isArray(allUsers) && allUsers.filter(e => e.senderEmail !== email).map((e) => (
            <option key={e._id} value={e.email}>{e.name}</option>
          ))}
        </select>
        <br/>
        <textarea placeholder='type your message here...' value={message} onChange={e => setMessage(e.target.value)} style={{width:'400px',height:'100px',border:'1px solid gray',borderRadius:'5px',padding:'10px'}}></textarea>
        <br/><br/>
        <button type='submit' className='btn btn-sm bg-danger text-white'>send message</button>
      </form>
      {toast && <p style={{marginTop:'20px',textAlign:'center',color:'red'}}>{toast}</p>}
    </div>
    </>
  )
}

export default SendMessage