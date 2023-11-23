import React, { useState} from 'react';
import classes from "./Header.module.css";

const shortTime = {
    timeStyle: "short"
  };

const Header = () => {

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
                <div>
                    <h1 className={classes.date}>{`${currentDate}, ${currentTime}`}</h1>
                </div>
            </div>
            <hr className={classes.line} />
        </React.Fragment>
    )
}

export default Header;