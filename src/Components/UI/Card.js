import React from "react";
import classes from "./Card.module.css";

import Form from "../Form";

const Card = props => {
  const saveTaskDataHandler = enteredTaskData => {
    //lifting state up to parent component
    props.onAddTask(enteredTaskData);
  };

  const deleteHandler = deletedTaskData => {
    //lifting state up to parent component
    props.deleteTask(deletedTaskData);
  };

  return (
    <div className={classes.card}>
      {/* receiving state from child component */}
      <Form
        tasks={props.job}
        onSaveTaskData={saveTaskDataHandler}
        deleteTask={deleteHandler}
        onAddTask={saveTaskDataHandler}
        taskIsComplete={props.finito}
      />
    </div>
  );
};

export default Card;
