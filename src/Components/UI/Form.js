import React, { useState } from "react";
import classes from "./Form.module.css";
import SearchBar from "./SearchBar";

import NewTasks from "./NewTasks/NewTasks";
// import ErrorModal from "./UI/ErrorModal";

const Form = props => {
  //initializing state
  const [enteredTask, setEnteredTask] = useState("");

  const changeHandler = e => {
    //putting input into state variable
    setEnteredTask(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();

    //form validation to make sure empty string is not submitted
    if (enteredTask.trim().length === 0) {
      return;
    }
    
    //Lifting state up to Parent component
    props.onSaveTaskData(enteredTask);
    //resetting input field
    setEnteredTask("");
  };

  return (
    <React.Fragment>
      <div className={classes.header_container}>
        <h1 className={classes.header}>DO</h1>
        <hr />
        <div>
          {props.tasks.map((task, index) => {
            return (
              //Todo element
              <NewTasks
                //Todo completed status passed down from parent component from db
                assignment={task.completed}
                //Function passed down from parent component to fetch tasks from db
                fetchTodos={props.updateTodos}
                //Todo Description passed down from db 
                toDoDescription={task.description}
                //Todo task id passed down from parent component
                taskId={task.id}
                key={task.id}
                index={index}
              />
            );
          })}
        </div>
      </div>

      <form className={classes.form__input} onSubmit={submitHandler}>
        <SearchBar
          placeholder="Enter a task..."
          task={enteredTask}
          change={changeHandler}
          name="Add task"
        />
      </form>
    </React.Fragment>
  );
};

export default Form;
