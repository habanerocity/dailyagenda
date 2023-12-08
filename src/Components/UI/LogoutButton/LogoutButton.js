import React, { useContext, useEffect } from 'react';

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

        console.log(userCtx.guestUser);

        if(userCtx.guestUser.isGuest){
            userCtx.setGuestUser({
                isGuest: false,
                guestId: '',
              });

              console.log(userCtx.guestUser);
              
              //Set userCtx.isLoggedIn to false
              userCtx.setIsLoggedIn();
              
              //Set redirectToLogin as true
            //   console.log(userCtx.redirectToLogin);
              console.log('guest has logged out!');
              userCtx.setRedirectToLogin();
            //   console.log(userCtx.redirectToLogin);
              
              localStorage.removeItem("guestId");
        }

        if(!userCtx.guestUser.isGuest){
            userCtx.setGuestUser({
                isGuest: false,
                guestId: '',
              });
              
            navigate("/Login");
        }
    }

    useEffect(() => {
        console.log(userCtx.guestUser.isGuest);
        if(!userCtx.guestUser.isGuest){
            console.log("navigating to login screen...");
            console.log(userCtx.guestUser.isGuest);
            navigate("/Login");
        }
    }, [userCtx.guestUser.isGuest])

    return (
            <button className={classes.logout__btn} onClick={handleLogout}>Log out</button>
    )
}

export default LogoutButton;