
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    
    window.location.href = `https://hiring.reachinbox.xyz/api/v1/auth/google-login?redirect_to=${encodeURIComponent(window.location.origin)}`;
  };

  useEffect(() => {
    
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      
      localStorage.setItem('token', token);

      navigate('/onebox');
    }
  }, [navigate]);
  const root=()=>{
    navigate('/onebox')
  }

  return (
    <div>
      <div className="card">
        <img 
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGFY9mr0b4ljUaq5U4FQp2CJ5nagbGOZITcacvZxFTJMt41t1j&usqp=CAU' 
          alt='brand'
          className='imgae' 
        />
        <h2>REACHINBOX</h2>
      </div>
      <div className="login-container">
        <div className="login-box">
          <h2>Login with Google</h2>
          <button onClick={handleLogin} className="google-login-btn">
            <img 
              src='https://developers.google.com/identity/images/g-logo.png' 
              alt='Google logo' 
              className="google-logo"
            />
            Login with Google
          </button>
          <button onClick={root}>Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
