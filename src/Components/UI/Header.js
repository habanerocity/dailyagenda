import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../store/user-context";
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import classes from "./Header.module.css";

const shortTime = {
  timeStyle: "short"
};

const Header = () => {
  const userCtx = useContext(UserContext);
  // console.log(userCtx.tasksList[0].full_name);
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("en-US", shortTime));
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  const [welcomeDisplayed, setWelcomeDisplayed] = useState(false);

  useEffect(() => {
    console.log("Header - Component mounted");

    // Update the time and date every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString("en-US", shortTime));
      setCurrentDate(new Date().toDateString());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      console.log("Header - Component unmounted");
      clearInterval(intervalId);
    };
  }, []); // Empty dependency array ensures that the effect runs only once, similar to componentDidMount

  useEffect(() => {
    console.log("Header - IsLoggedIn:", userCtx.isLoggedIn);

    if (!userCtx.isLoggedIn && userCtx.redirectToLogin) {
        userCtx.setRedirectToLogin();
        console.log('Redirect to login:', userCtx.redirectToLogin);
        console.log("Redirecting to Login...");
        navigate("/Login");
      }
    // }
  }, [userCtx.isLoggedIn]);

  useEffect(() => {
    // Display welcome message only once when the component mounts
    if (!welcomeDisplayed && userCtx.tasksList.length > 0) {
      setWelcomeDisplayed(true);
    }
  }, [userCtx.tasksList, welcomeDisplayed]);

  return (
    <React.Fragment>
      <div className={classes.heading}>
        <div>
          <h1 className={classes.daily}>Daily Agenda Todo List</h1>
          {welcomeDisplayed && (<h2 className={classes.welcome}>{userCtx.tasksList[0] && `Welcome back ${userCtx.tasksList[0].full_name}!`}</h2>)}
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
