import React, { useState, useContext, useEffect } from "react";
import classes from "./ToDoCard.module.css";

import { UserContext } from "../../../store/user-context";

import SearchBar from "../SearchBar";
import Todo from "../Todo/Todo";

const Card = () => {
  //initializing state
  const [enteredTask, setEnteredTask] = useState('');
  const [enteredTasksList, setEnteredTasksList] = useState([]);

  //Import userContext store
  const userCtx = useContext(UserContext);

  //Change enteredTask state variable every keystroke
  const changeHandler = e => {
    //Storing user input into state variable
    setEnteredTask(e.target.value);
  };

  const addGuestTodoHandler = (todo) => {
    //New Task Object being put together in Parent Component, task being received from Card.
    
    if(userCtx.guestUser.isGuest){

      userCtx.setGuestTodos(prevTodos => {
        return [
          //state array depends on previous state objects
          ...prevTodos,
          { id: Math.random().toString(), todo: todo, completed: false }
        ];
      });
  
      localStorage.setItem("todos", JSON.stringify(userCtx.guestTodos));
    }
    
  };

  useEffect(() => {
    
    localStorage.setItem("todos", JSON.stringify(enteredTasksList));
  }, [enteredTasksList])


  //Submit todo
  const submitHandler = e => {
    e.preventDefault();

    //Form validation to make sure empty string is not submitted
    if (enteredTask.trim().length === 0) {
      return;
    }
    
    if(userCtx.jwt){
      //Lifting state up to Parent component via context
      userCtx.addTaskHandler(enteredTask);

      //resetting input field
      setEnteredTask("");
    }

    if(userCtx.guestUser.isGuest){
      addGuestTodoHandler(enteredTask);
      
      //resetting input field
      setEnteredTask("");
    }
  };

  console.log(userCtx.guestTodos);

  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <h1 className={classes.header}>DO</h1>
        <hr />
        <div>
          {userCtx.jwt && userCtx.tasksList.map((task, index) => {
            return (
              //Todo element
              <Todo
                //Todo completed status passed down via parent component from db
                assignment={task.completed}
                //Todo Description passed down via parent component from db 
                toDoDescription={task.description}
                //Todo task id passed down via parent component from db
                taskId={task.id}
                key={task.id}
                index={index}
              />
            );
          })}
          {userCtx.guestUser.isGuest && userCtx.guestTodos.map((todo, index) => {
            return (
              //Todo element
              <Todo
                //Todo completed status passed down via parent component from db
                assignment={todo.completed}
                //Todo Description passed down via parent component from db 
                toDoDescription={todo.todo}
                //Todo task id passed down via parent component from db
                taskId={todo.id}
                key={todo.id}
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
    </div>
  );
};

export default Card;
