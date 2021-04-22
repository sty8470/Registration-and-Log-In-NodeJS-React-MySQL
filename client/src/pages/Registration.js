import React, {useState, useEffect} from "react";
import Axios from 'axios';

function Registration() {

  //we need to grab the information of inputs and to validate them
  //usernameReg = username that is registered
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    //send information from frontend to the backend to see if session exists
    Axios.defaults.withCredentials = true;

    const register = () => {
      Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg,
      }).then((response)=> {
        console.log(response);
      })
    }

    return (
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
        type="text" 
        onChange={(e) => 
          {setPasswordReg(e.target.value)}} 
          />
      <button onClick={register}> Register </button>
      </div>
    )
  }

export default Registration
