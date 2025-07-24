import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client';
import { Link } from 'react-router-dom';
import ProfileImage from '../image/c.jpg';
import { CgMail } from "react-icons/cg";

function Admin() {

  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const socket = io(import.meta.env.VITE_BACKEND_URL);

  const [dropDown, setDropdown] = useState('');

  const [toast, setToast] = useState('');

  const [message, setMessage] = useState([]);
  const [unreadMessage, setUnreadMessage] = useState([]);

  const fetchMessage = () => {
    fetch(`${backend_url}/api/message/show`)
    .then(res => res.json())
    .then(data => {
      setMessage(data.data);
      setUnreadMessage(data.data.filter(m => !m.isRead).length);
    })
    .catch((error) => {setToast(error.message)})
  };
  useEffect(() => {fetchMessage();},[]);

  const markAllAsRead = () => {
    fetch(`${backend_url}/api/message/markAllAsRead`, {
      method: 'POST'
    })
    .then(() => fetchMessage());
  }

  useEffect(() => {
    socket.on('new_message', (data) => {
      fetchMessage();
    });
    return () => {
      socket.off('new_message');
    };
  }, []);

  // to display date & time in indian standard
  function formatDateTime(isoString) {
  const date = new Date(isoString);
  // for day, month, year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();
  // for hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${day}-${month}-${year} at ${hours}:${minutes} ${ampm}`;
  
  }

  // to claculate how many time ago message came
  function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} weeks ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  const years = Math.floor(days / 365);
  return `${years} years ago`;
  
  }

  return (
    <div className='' style={{backgroundColor:'red',width:'100%',color:'white',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{padding:'6px 20px'}}>
        <h3>Admin</h3>
      </div>
      <div style={{padding:'6px 20px'}} onClick={() => setDropdown(!dropDown)}>
        <div style={{baorder:'1px solid #F5F6FA',backgroundColor:'#F5F6FA',borderRadius:'5px',color:'black',padding:'5px 12px',display:'flex'}}>
          <span><CgMail style={{fontSize:'22px'}} /></span>
          {unreadMessage > 0 && (
            <span style={{fontSize:'11px',marginTop:'-3px',padding:'0px 4px',color:'white',position:'absolute',marginLeft:'15px',border:'1px solid red',borderRadius:'50%',backgroundColor:'red'}}>
              {unreadMessage}
            </span>
          )}
        </div>
      </div>
      {dropDown && (
        <div style={{position:'fixed',width:'350px',right:'35px',backgroundColor:'white',color:'black',top:'45px',border:'1px solid gray',borderRadius:'5px'}}>
          
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 10px',borderBottom:'1px solid gray'}}>
          <span style={{fontWeight:'700',color:'#092C4C'}}>Notifications</span>
          <span style={{color:'orange',cursor:'pointer'}} onClick={markAllAsRead}>Mark all as read</span>
          </div>

          <div style={{height:'200px',overflow:'auto',borderBottom:'1px solid gray',}}>

            {Array.isArray(message) && message.map((e) => 
            <div key={e._id} style={{display:'flex',padding:'8px 10px',gap:'5px',borderBottom:'1px solid gray'}}>
              <div><img src={ProfileImage} style={{width:'50px',borderRadius:'50%'}} /></div>
              <div>
                <span style={{fontWeight:'500'}}>{e.name}</span>
                <span style={{fontWeight:'400',color:'#86888bff'}}> {e.message.length > 40 ? e.message.slice(0, 40) + "..." : e.message}</span>
                <br/>
                <span style={{fontSize:'12px',fontWeight:'400'}}>{timeAgo(e.time)}</span>
              </div>
              <div>{e.isRead ? <span style={{color:'orange'}}></span> : <span style={{color:'orange',fontSize:'30px'}}>•</span>}</div>
            </div>
            )}
            {toast && <p>{toast}</p>}

          </div>

          <div style={{padding:'8px',display:'flex',justifyContent:'space-around'}}>
            <button onClick={()=>{setDropdown(false)}} style={{backgroundColor:'#092C4C',color:'white',padding:'5px 40px',borderRadius:'5px',textDecoration:'none'}}>Cancel</button>
            <Link onClick={markAllAsRead} to="/AllMessages" style={{backgroundColor:'orange',color:'white',padding:'5px 40px',borderRadius:'5px',textDecoration:'none'}}>View All</Link>
          </div>

        </div>
      )}
    </div>
  )
}

export default Admin