import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../../store/user-context";
import LogoutButton from '../LogoutButton/LogoutButton';
import { useNavigate } from 'react-router-dom';
import classes from "./Header.module.css";

const shortTime = {
  timeStyle: "short"
};

const Header = () => {
  const userCtx = useContext(UserContext);

  const navigate = useNavigate();

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
    if (!userCtx.isLoggedIn && userCtx.redirectToLogin) {
        userCtx.setRedirectToLogin();

        navigate("/Login");
      }
    // }
  }, [userCtx, navigate]);

  return (
    <React.Fragment>
      <div className={classes.heading}>
        <div>
          <h1 className={classes.daily}>Daily Agenda Todo List</h1>
          <h2 className={classes.welcome}>{userCtx.isLoggedIn && userCtx.userFullName && `Welcome back ${userCtx.userFullName}! 👋`}</h2>
        </div>
        {userCtx.isLoggedIn && 
          <div className={classes.flex__row}>
            <h1 className={classes.date}>{`${currentDate}, ${currentTime}`}</h1>
            <LogoutButton />
          </div> 
        }
      </div>
      <hr className={classes.line} />
    </React.Fragment>
  );
}

export default Header;