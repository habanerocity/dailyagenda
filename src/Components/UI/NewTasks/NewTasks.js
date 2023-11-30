import React, { useState } from "react";
import classes from "./NewTasks.module.css";

import check from "../../../assets/check.png";
import trash from "../../../assets/trash.png";

const NewTasks = props => {
  
  const completeBtnHandler = () => {
    
  
  };

  const removeTaskBtnHandler = () => {
    props.taskIsGone(props.index);
  };

  //transform db value completed into number, rendering it truthy
  const completed = Number(props.assignment);

  return (
    <div className={classes.toDo}>
      <div
        style={{
          textDecoration: completed ? "line-through" : "",
          textDecorationColor: completed ? "#fb8f0d" : ""
        }}
        className={classes.task}
      >
        {props.agenda}
      </div>

      <div className={classes.btn__container}>
        <div className={classes.btn__complete} onClick={completeBtnHandler(props.assignment)}>
          <img alt="complete" className={classes.icon} src={check} />
        </div>
        <div className={classes.btn__close} onClick={removeTaskBtnHandler}>
          <img alt="delete" className={classes.icon} src={trash} />
        </div>
      </div>
    </div>
  );
};

export default NewTasks;
