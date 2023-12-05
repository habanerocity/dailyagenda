import React, { useContext} from 'react';

import { UserContext } from "../../store/user-context";

import classes from './LogoutButton.module.css';

const LogoutButton = () => {

    const userCtx = useContext(UserContext);

    const jwt = localStorage.getItem('jwtToken');

    const handleLogout = () => {

        // Clear jwt token from localStorage
        if(jwt){
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userFullName');
            // Set userCtx.isLoggedIn to false
            userCtx.setIsLoggedIn();

            userCtx.setRedirectToLogin();
        }

        if (!jwt) {
            console.log('no jwt found!');
        }
    }

    return (
            <button className={classes.logout__btn} onClick={handleLogout}>Log out</button>
    )
}

export default LogoutButton;
