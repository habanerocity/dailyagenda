import React from "react";
import classes from "./ToDoCard.module.css";

import Form from "./Form";

const Card = props => {
  const saveTaskDataHandler = enteredTaskData => {
    //lifting state up to parent component
    props.onAddTask(enteredTaskData);
  };

  return (
    <div className={classes.card}>
      {/* receiving state from child component */}
      <Form
        tasks={props.job}
        onSaveTaskData={saveTaskDataHandler}
        onAddTask={saveTaskDataHandler}
        //function passed down from parent component to fetch tasks from db
        updateTodos={props.fetchTasks}
        taskIsComplete={props.finito}
      />
    </div>
  );
};

export default Card;
