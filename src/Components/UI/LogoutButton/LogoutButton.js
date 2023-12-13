import React, { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import { UserContext } from "../../../store/user-context";

import classes from './LogoutButton.module.css';

const LogoutButton = () => {
    const userCtx = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        // Clear jwt token from localStorage
        if(userCtx.jwt){
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userFullName');

            //Set userCtx.isLoggedIn to false
            userCtx.setIsLoggedIn();

            //Set redirectToLogin as true
            userCtx.setRedirectToLogin();
        }

        //If no jwt is found
        if (!userCtx.jwt) {
            console.log('no jwt found!');
        }

        //Clear guest ID from localStorage and redirect to login if user is Guest
        if(userCtx.guestUser.isGuest){
            userCtx.setGuestUser({
                isGuest: false,
                guestId: null,
              });
              
              userCtx.setRedirectToLogin();
              
              localStorage.removeItem("guestId");
        }

        //If user is not a guest user, navigate to login page
        if(!userCtx.guestUser.isGuest){
            userCtx.setGuestUser({
                isGuest: false,
                guestId: null,
              });
              
            navigate("/Login");
        }
    }

    return (
            <button className={classes.logout__btn} onClick={handleLogout}>Log out</button>
    )
}

export default LogoutButton;