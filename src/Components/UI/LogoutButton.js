import React, { useState, useContext } from 'react';
import { Navigate, Link } from 'react-router-dom';

import { UserContext } from "../../store/user-context";

import classes from './LogoutButton.module.css';

const LogoutButton = () => {
    const [redirectToLogin, setRedirectToLogin] = useState(false);

    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

    const handleLogout = () => {
        //Clear jwt token from localStorage
        localStorage.removeItem('jwtToken');
        
        setIsLoggedIn(false);
        console.log(isLoggedIn);
        
        if(!setIsLoggedIn){
            setRedirectToLogin(true);
        }


    }


    if(redirectToLogin) {
        return <Navigate to="/Login" />;
      }

    return (
        <Link to="/Login">
            <button className={classes.logout__btn} onClick={handleLogout}>Log out</button>
        </Link>
    )
}

export default LogoutButton;