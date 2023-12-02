// import React, { useState, useContext } from 'react';
import React, { useState } from 'react';

// import { UserContext } from "../../store/user-context";

import LogoutButton from './LogoutButton';

import classes from "./Header.module.css";

const shortTime = {
    timeStyle: "short"
  };

const Header = () => {
    // const { isLoggedIn } = useContext(UserContext);

    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("en-US", shortTime));
    const [currentDate, setCurrentDate] = useState(new Date().toDateString());

    //update the time and date every second
    setInterval(() => {
    setCurrentTime(new Date().toLocaleString("en-US", shortTime));
    setCurrentDate(new Date().toDateString());
    }, 1000);

    return (
        <React.Fragment>
            <div className={classes.heading}>
                <div>
                    <h1 className={classes.daily}>Daily Agenda Todo List</h1>
                </div>
                {/* {isLoggedIn &&  */}
                 <div className={classes.flex__row}>
                     <h1 className={classes.date}>{`${currentDate}, ${currentTime}`}</h1>
                     <LogoutButton />
                 </div> 
                {/* } */}
            </div>
            <hr className={classes.line} />
        </React.Fragment>
    )
}

export default Header;