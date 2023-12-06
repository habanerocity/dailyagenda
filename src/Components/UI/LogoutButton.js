import React, { useContext} from 'react';

import { UserContext } from "../../store/user-context";

import classes from './LogoutButton.module.css';

const LogoutButton = () => {

    const userCtx = useContext(UserContext);

    const handleLogout = () => {

        // Clear jwt token from localStorage
        if(userCtx.jwt){
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userFullName');
            // Set userCtx.isLoggedIn to false
            userCtx.setIsLoggedIn();

            userCtx.setRedirectToLogin();
        }

        if (!userCtx.jwt) {
            console.log('no jwt found!');
        }
    }

    return (
            <button className={classes.logout__btn} onClick={handleLogout}>Log out</button>
    )
}

export default LogoutButton;