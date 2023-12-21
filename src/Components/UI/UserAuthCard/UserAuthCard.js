import React from "react";

import TodoCardHeader from "../TodoCardHeader/TodoCardHeader";

import classes from "./UserAuthCard.module.css";

const UserAuthCard = (props) => { 
        return (
            <div className={classes.user__card}>
                <div className={classes.header_container}>
                    <TodoCardHeader name={props.headerName} />
                    {props.children}
                </div>
            </div>
        );
}

export default UserAuthCard;