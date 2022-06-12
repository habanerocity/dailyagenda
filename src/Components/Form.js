import React, { useState } from "react";
import classes from "./Form.module.css";
import Button from "./UI/Button";
// import ErrorModal from "./UI/ErrorModal";

const Form = props => {
  //initializing state
  const [enteredTask, setEnteredTask] = useState("");

  // const { taskName } = props.objct;

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
      </div>

      <form className={classes.form__input} onSubmit={submitHandler}>
        <input
          type="text"
          id="field"
          placeholder="Enter a task..."
          value={enteredTask}
          onChange={changeHandler}
        />
        <Button>Add Task</Button>
      </form>
    </React.Fragment>
  );
};

export default Form;
