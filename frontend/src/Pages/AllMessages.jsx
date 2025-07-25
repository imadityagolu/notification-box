import React, { useEffect, useState } from 'react'
import ProfileImage from '../image/c.jpg';
import { CiClock2 } from "react-icons/ci";

function AllMessages() {

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const[msgtoast, setMsgToast] = useState([]);

    const[message, setMessage] = useState([]);

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
  
    useEffect(() => {
      const storedName = localStorage.getItem('userName');
      const storedEmail = localStorage.getItem('userEmail');
      if (storedName) {
        setName(storedName);
      }
      if (storedEmail) {
        setEmail(storedEmail);
      }
    }, []);

    const fetchMessage = () => {
        fetch(`${backend_url}/api/message/show`)
        .then(res => res.json())
        .then(data => {setMessage(data.data);})
        .catch((error) => {setMsgToast(error.message)});
    };
    useEffect(() => {fetchMessage();},[]);

  function formatDateTime(isoString) {
  const date = new Date(isoString);

  // Get day, month, year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${day}-${month}-${year} at ${hours}:${minutes} ${ampm}`;
  
  }

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
  
    const [allUsers, setAllUsers] = useState([]);

    // Fetch all users for mapping senderEmail to name
    useEffect(() => {
      fetch(`${backend_url}/api/user/list`)
        .then(res => res.json())
        .then(data => setAllUsers(Array.isArray(data) ? data : data.users || []));
    }, [backend_url]);
  
  // Helper to get name from email
  const getNameByEmail = (email) => {
    const user = allUsers.find(u => u.email === email);
    return user ? user.name : email;
  };

  return (
    <>
    <div style={{padding:'10px 20px'}}>
        {/* header */}
        <div>
            <span style={{fontSize:'22px',fontWeight:'700'}}>All Notifications</span>
            <br/>
            <span style={{fontSize:'19px',fontWeight:'400',color:'#86888bff'}}>View your all activities</span>
        </div>

        {/* all messages */}
        <div style={{marginTop:'15px'}}>

            {Array.isArray(message) && message.filter(e => e.email === email).map((e) => 
            <div key={e._id} style={{display:'flex',padding:'10px 20px',gap:'10px',border:'1px solid #94979eff',borderRadius:'5px',backgroundColor:'white',marginBottom:'15px'}}>
                <div>
                    <img src={ProfileImage} style={{width:'50px',borderRadius:'50%'}} />
                </div>
                <div>
                    <span style={{fontWeight:'500'}}>{getNameByEmail(e.senderEmail)}</span>
                    <span style={{fontWeight:'400',color:'#86888bff'}}> {e.message}</span>
                    <br/>
                    <div style={{alignItems:'center'}}><CiClock2 /> <span style={{fontSize:'12px',fontWeight:'400'}}>{timeAgo(e.time)}</span></div>
                </div>
            </div>
            )}
            {msgtoast && <p>{msgtoast}</p>}
        </div>
    </div>
    </>
  )
}

export default AllMessages