import React, { useEffect, useState } from 'react';
import "./App.css"

function App() {
  const [token, setToken] = useState('');
  const [profileData, setProfileData] = useState('')

  useEffect(() => {
    const handleCredentialResponse = (e) => {
      console.log('handleCredentialResponse ----', e);
      // console.log('token ----', e.credential);
      setToken(e.credential);

      if (e.credential) {
        
        setToken(e.credential)
      }
    };
    
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: '515549476502-gi26gf9aqe6ahn5c5dnm7s6o1trn5u2l.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      google.accounts.id.prompt();
      google.accounts.id.renderButton(document.getElementById("signinDiv"), {
        theme: 'outline',
        size: 'large',
        click_listener: onClickHandler
      })
    
    };
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts


  console.log('token---------',token)
  const fetchData = async (token) => {
    const apiRes = await fetch('http://localhost:8081/app/decode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token
      })
    });
  
    const res = await apiRes.json();
    if (res.error) {
      console.error("Error:", res.error);
    } else {
      setProfileData(res)
      console.log("Response:", res);
    }
  }
  
  // Usage
  
  
  


  function onClickHandler(){
    console.log("Sign in with Google button clicked...")
  }

  return (
    <>
      <div id="signinDiv"></div>
      <button 
        onClick={()=>fetchData(token)}
      >get data</button>

      {
        profileData ? <div className='data'>
        <img src={profileData.picture} alt="" />
          <h1>Name : {profileData.name}</h1>
          <h1>Email : {profileData.email}</h1>
      </div> : ""
      }
    </>
  );
}

export default App;
