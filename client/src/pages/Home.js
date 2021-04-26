import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { useHistory } from "react-router-dom";

function Home() {
    const history = useHistory();
    const navigateToRegister = () => history.push('/register');
    const navigateToLogin = () => history.push('/login');

    return (
        <div>
            <h1>Welcome to LuxPM website!</h1>
            <h2>Please Sign Up or Log in now!</h2>
            <h3>This is a homepage: URL is "http://localhost:3000/"</h3>
            <button onClick={navigateToRegister}>Register</button>
            <button onClick={navigateToLogin}>Login</button>
        </div>
    )
}

export default Home
