import React from "react";

import classes from "./UserIcon.module.css";

const UserIcon = (props) => {
    return (
        <React.Fragment>
          <div className={classes.user__icon__wrapper}>
            <img src={props.pic} alt="user icon" className={classes.user__icon}/>
          </div>
        </React.Fragment>
    );
    };

export default UserIcon;