import React from "react";
import classes from "./Card.module.css";
import Form from "../Form";

const Card = props => {
  const saveTaskDataHandler = enteredTaskData => {
    //lifting state up to parent component
    props.onAddTask(enteredTaskData);
  };

  return (
    <div className={classes.card}>
      {/* receiving state from child component */}
      <Form onSaveTaskData={saveTaskDataHandler} />
    </div>
  );
};

export default Card;
