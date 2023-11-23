import React, { useState } from "react";
import classes from "./Form.module.css";
import SearchBar from "./SearchBar";

import NewTasks from "./UI/NewTasks/NewTasks";
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

  const deleteHandler = deletedTaskData => {
    //lifting state up to parent component
    props.deleteTask(deletedTaskData);
  };

  // const saveTaskDataHandler = enteredTaskData => {
  //   //lifting state up to parent component
  //   props.onAddTask(enteredTaskData);
  // };

  return (
    <React.Fragment>
      <div className={classes.header_container}>
        <h1 className={classes.header}>DO</h1>
        <hr />
        <div>
          {props.tasks.map((task, index) => {
            // console.log(index);
            return (
              <NewTasks
                assignment={task.completed}
                taskIsGone={deleteHandler}
                accomplishedTask={props.taskIsComplete}
                agenda={task.data}
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
