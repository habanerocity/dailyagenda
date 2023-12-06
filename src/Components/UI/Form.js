import React, { useState, useContext } from "react";
import classes from "./Form.module.css";
import SearchBar from "./SearchBar";

import { UserContext } from "../../store/user-context";

import NewTasks from "./NewTasks/NewTasks";
// import ErrorModal from "./UI/ErrorModal";

const Form = () => {
  // console.log('form is rendering');
  //initializing state
  const [enteredTask, setEnteredTask] = useState("");

  //Import userContext store
  const userCtx = useContext(UserContext);

  //Change enteredTask state variable every keystroke
  const changeHandler = e => {
    //putting input into state variable
    setEnteredTask(e.target.value);
  };

  //Submit todo
  const submitHandler = e => {
    e.preventDefault();

    //form validation to make sure empty string is not submitted
    if (enteredTask.trim().length === 0) {
      return;
    }
    
    //Lifting state up to Parent component
    userCtx.addTaskHandler(enteredTask);

    //resetting input field
    setEnteredTask("");
   
  };

  return (
    <React.Fragment>
      <div className={classes.header_container}>
        <h1 className={classes.header}>DO</h1>
        <hr />
        <div>
          {userCtx.tasksList.map((task, index) => {
            return (
              //Todo element
              <NewTasks
                //Todo completed status passed down from parent component from db
                assignment={task.completed}
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
