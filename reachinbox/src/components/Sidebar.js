import React, { useState, useEffect } from 'react';
import '../styles/Sidebar.css'; 
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
  const navigate=useNavigate();
  const onebox=()=>{
    navigate('/onebox')
  }
  const [userInitials, setUserInitials] = useState('');

  useEffect(() => {
 
    const fetchUserInitials = () => {
     
      const token = localStorage.getItem('token');

     
      if (token) {

        const user = { email: 'johndoe@example.com' };

        if (user && user.email) {
         
          const initials = user.email.slice(0, 2).toUpperCase();
          setUserInitials(initials);
        }
      }
    };

    fetchUserInitials();
  }, []);

  return (
    <aside className="sidebar">
      
      <nav className="nav-menu">
        <ul>
          <li className="active"><i className="fas fa-home"></i></li>
          <li><i className="fas fa-user"></i></li>
          <li><i className="fas fa-envelope" onClick={onebox}></i></li>
          <li><i className="fas fa-check" ></i></li>
          <li><i className="fas fa-list"></i></li>
          <li><i className="fas fa-bell"></i></li>
          <li><i className="fas fa-chart-line"></i></li>
        </ul>
      </nav>
      <div className="user-profile">
        <div className="user-initials">{userInitials}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
