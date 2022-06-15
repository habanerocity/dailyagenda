import React from "react";
import classes from "./CompletedTasks.module.css";

import trash from "../../../assets/trash.png";

const NewTasks = props => {
  const removeTaskBtnHandler = () => {
    props.taskIsGone(props.key);
  };

  return (
    <div className={classes.toDo}>
      <div className={classes.task}>{props.agenda}</div>
      <div className={classes.btn__container}>
        <div className={classes.btn__close} onClick={removeTaskBtnHandler}>
          <img alt="delete" className={classes.icon} src={trash} />
        </div>
      </div>
    </div>
  );
};

export default NewTasks;
