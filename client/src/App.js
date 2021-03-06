import React, {useState, useEffect} from "react";
import Axios from 'axios';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Registration from './pages/Registration';
import LogIn from './pages/Login';
function App() {

  // //we need to grab the information of inputs and to validate them
  // //usernameReg = username that is registered
  // const [usernameReg, setUsernameReg] = useState('');
  // const [passwordReg, setPasswordReg] = useState('');

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const [loginStatus, setLoginStatus] = useState('');

  // //send information from frontend to the backend to see if session exists
  // Axios.defaults.withCredentials = true;

  // const register = () => {
  //   Axios.post("http://localhost:3001/register", {
  //     username: usernameReg, 
  //     password: passwordReg,
    
  //   }).then((response) => {
  //     console.log(response);
  //   })
    
  // };

  // const login = () => {
  //   Axios.post("http://localhost:3001/login", {
  //     username: username, 
  //     password: password,
    
  //   }).then((response) => {
  //     if (response.data.message) {
  //       setLoginStatus(response.data.message);
  //     } else{
  //       setLoginStatus(response.data[0].username);
  //     }
      
  //   })
    
  // };

  // //every time we refresh our page, we want to get information from this URL if we are logged in or not.
  // useEffect(() => {
  //  Axios.get("http://localhost:3001/login").then((response)=> {
  //    if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].username);
  //       console.log(response);
  //    }
      
  //  })
  // }, [])

  return(
<Router>
    <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/register" component={Registration}></Route>
        <Route exact path="/login" component={LogIn}></Route>
    </Switch>
  </Router>
  )
  

}
export default App;
