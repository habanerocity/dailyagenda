import React, { useState, useContext, useEffect } from "react";
import classes from "./ToDoCard.module.css";

import { UserContext } from "../../../store/user-context";

import SearchBar from "../SearchBar";
import Todo from "../Todo/Todo";

const ToDoCard = () => {
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

  const sortTodosByCompletion = (todos) => {
    //Sort todos by completion status
    const completedTodos = todos.filter(todo => Number(todo.completed) === 1);

    //Sort todos by completion status
    const incompleteTodos = todos.filter(todo => Number(todo.completed) === 0);

    // Sort completed todos by completedAt timestamp
    completedTodos.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

    //Concatenate completed and incomplete todos
    const sortedTodos = completedTodos.concat(incompleteTodos);

    return sortedTodos;

  }

  const addGuestTodoHandler = (todo) => {
    //New Task Object being put together in Parent Component, task being received from Card.
    
    if(userCtx.guestUser.isGuest){

      userCtx.setGuestTodos(prevTodos => {
        return [
          //state array depends on previous state objects
          ...prevTodos,
          { id: Math.random().toString(), todo: todo, completed: false, completedAt: null }
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

  //Sort user todos by completion status
  const sortedUserTodos = sortTodosByCompletion(userCtx.tasksList);

  //Sort guest todos by completion status
  const sortedGuestTodos = sortTodosByCompletion(userCtx.guestTodos);

  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <h1 className={classes.header}>DO</h1>
        <hr />
        <div>
          {userCtx.jwt ? sortedUserTodos.map((task, index) => {
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
          }) : null}
          {userCtx.guestUser.isGuest ? sortedGuestTodos.map((todo, index) => {
            return (
              //Todo element
              <Todo
                //Todo completed status passed down via parent component from local storage
                assignment={todo.completed}
                //Todo Description passed down via parent component from local storage 
                toDoDescription={todo.todo}
                //Todo task id passed down via parent component local from storage
                taskId={todo.id}
                key={todo.id}
                index={index}
              />
            );
          }) : null}
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

export default ToDoCard;
