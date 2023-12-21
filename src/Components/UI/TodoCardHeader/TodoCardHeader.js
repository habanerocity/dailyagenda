import React from "react";

import classes from "./TodoCardHeader.module.css";

const TodoCardHeader = (props) => {
    return (
        <React.Fragment>
            <h1 className={classes.header}>{props.name}</h1>
            <hr />
        </React.Fragment>
    );
    };

export default TodoCardHeader;