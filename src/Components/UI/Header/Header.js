import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from "../../../store/user-context";

import { useNavigate } from 'react-router-dom';

import LogoutButton from '../LogoutButton/LogoutButton';

import classes from "./Header.module.css";

const shortTime = {
  timeStyle: "short"
};

const Header = () => {
  //import UserContext from store
  const userCtx = useContext(UserContext);

  //Import useNavigate for programmatic navigation
  const navigate = useNavigate();

  //Initialize state variables for time and date
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("en-US", shortTime));
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  useEffect(() => {
    // Update the time and date every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("en-US", shortTime));
      setCurrentDate(new Date().toDateString());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    //If user is not logged in and redirectToLogin are true, redirect to Login page
    if (!userCtx.isLoggedIn && userCtx.redirectToLogin) {
        console.log("about to log out...");
        userCtx.setRedirectToLogin();

        navigate("/Login");
      }
    // }
  }, [userCtx, navigate]);

  return (
    <React.Fragment>
      <div className={classes.heading}>
        <div>
          <h1 className={classes.daily}>Daily Agenda App</h1>
          <h2 className={classes.welcome}>{(userCtx.guestUser.isGuest && `Welcome Guest! 👋`) || (userCtx.isLoggedIn && userCtx.userFullName && `Welcome back ${userCtx.userFullName}! 👋`)}</h2>
        </div>
        {(userCtx.isLoggedIn || userCtx.guestUser.isGuest) && 
          (<div className={classes.flex__row}>
            <h1 className={classes.date}>{`${currentDate}, ${currentTime}`}</h1>
            <LogoutButton />
          </div>) 
        }
      </div>
      <hr className={classes.line} />
    </React.Fragment>
  );
}

export default Header;