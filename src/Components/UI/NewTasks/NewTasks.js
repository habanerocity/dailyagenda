import React from "react";
import classes from "./NewTasks.module.css";

import check from "../../../assets/check.png";
import trash from "../../../assets/trash.png";

const NewTasks = props => {
  const completeBtnHandler = () => {
    props.accomplishedTask(props.index);
  };

  const removeTaskBtnHandler = () => {
    props.taskIsGone(props.index);
  };

  return (
    <div className={classes.toDo}>
      <div
        style={{
          textDecoration: props.assignment ? "line-through" : "",
          textDecorationColor: props.assignment ? "#c1122f" : ""
        }}
        className={classes.task}
      >
        {props.agenda}
      </div>

      <div className={classes.btn__container}>
        <div className={classes.btn__complete} onClick={completeBtnHandler}>
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
