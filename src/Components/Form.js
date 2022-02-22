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
    <form action="" className={classes.form__input} onSubmit={submitHandler}>
      <label htmlFor="field">Enter a Task</label>
      <input
        type="text"
        id="field"
        value={enteredTask}
        onChange={changeHandler}
      />
      <div className={classes.btn__container}></div>
      <Button>Submit</Button>
    </form>
  );
};

export default Form;
