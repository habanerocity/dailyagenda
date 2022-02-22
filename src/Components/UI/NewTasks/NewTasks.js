import React from "react";
import classes from "./NewTasks.module.css";

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
        style={{ textDecoration: props.assignment ? "line-through" : "" }}
        className={classes.task}
      >
        {props.agenda}
      </div>

      <div className={classes.btn__container}>
        <button
          type="button"
          className={classes.btn__complete}
          onClick={completeBtnHandler}
        >
          Done
        </button>
        <button
          className={classes.btn__close}
          onClick={removeTaskBtnHandler}
          type="button"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default NewTasks;
