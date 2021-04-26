import React, {useState, useEffect} from "react";
import Axios from 'axios';

function Registration() {

  //we need to grab the information of inputs and to validate them
  //usernameReg = username that is registered
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [regStatus, setRegStatus] = useState('');

    //send information from frontend to the backend to see if session exists
    Axios.defaults.withCredentials = true;

    const register = () => {
      Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg,
      }).then((response)=> {
        console.log(response.data);
        setRegStatus(response.data);
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      e.target.reset();
    }

    return (
    <form onSubmit={handleSubmit}>
        <div className="registration">
          <h1>Registration</h1>
          <label>Username</label>
            <input 
              type="text" 
              onChange={(e) => 
                {setUsernameReg(e.target.value)}} 
              />
          <label>Password</label>
            <input 
              type="password" 
              onChange={(e) => 
                {setPasswordReg(e.target.value)}} 
              />
          <button onClick={register}> Register </button>
          <h4>{regStatus}</h4>
      </div>
    </form>
      
    )
  }

export default Registration
