import React, { useContext, useEffect, useReducer } from "react";
import classes from "./ToDoCard.module.css";

import { UserContext } from "../../../store/user-context";

import SearchBar from "../SearchBar";
import Todo from "../Todo/Todo";

// Define your initial state
const initialState = {
  enteredTask: '',
  enteredTasksList: [],
};

// Define your reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_ENTERED_TASK':
      return { ...state, enteredTask: action.payload };
    case 'SET_ENTERED_TASKS_LIST':
      return { ...state, enteredTasksList: action.payload };
    default:
      return state;
  }
};

//Sort todos by completion status
const sortTodosByCompletion = (todos) => {
  if (!todos) {
    return;
  }
  //Generate new array of completed todos based on completion status
  const completedTodos = todos.filter(todo => Number(todo.completed) === 1);

  //Generate new array of incomplete todos based on completion status
  const incompleteTodos = todos.filter(todo => Number(todo.completed) === 0);

  //Sort completed todos by completedAt timestamp
  completedTodos.sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

  //Concatenate completed and incomplete todos
  const sortedTodos = incompleteTodos.concat(completedTodos);

  //Return sorted todos
  return sortedTodos;
}

const ToDoCard = () => {

  // Use the useReducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  // Define your dispatch actions
  const setEnteredTask = (task) => {
    dispatch({ type: 'SET_ENTERED_TASK', payload: task });
  };

  //Import userContext store
  const userCtx = useContext(UserContext);

  //Change enteredTask state variable every keystroke
  const changeHandler = e => {
    //Storing user input into state variable
    setEnteredTask(e.target.value);
  };

  //Add guest todos to state and local storage
  const addGuestTodoHandler = (todo) => {
    
    if(userCtx.guestUser.isGuest){
      //Storing guest todos in state variable via context
      userCtx.setGuestTodos(prevTodos => {
        return [
          //state array depends on previous todos array
          ...prevTodos,
          //Generate a new todo object with a random id, the todo, completion status, and completedAt timestamp
          { id: Math.random().toString(), todo: todo, completed: false, completedAt: null }
        ];
      });
  
      //Storing guest todos in local storage
      localStorage.setItem("todos", JSON.stringify(userCtx.guestTodos));
    }
    
  };

  //Submit todo
  const submitHandler = (e) => {
    //Prevent page reload
    e.preventDefault();

    //Form validation to make sure empty string is not submitted
    if (state.enteredTask.trim().length === 0) {
      return;
    }
    
    if(userCtx.jwt){
      //Storing registered user todo in state variable via context
      userCtx.addTaskHandler(state.enteredTask);

      //resetting input field
      setEnteredTask("");
    }

    if(userCtx.guestUser.isGuest){
      //Storing guest todo in state variable via context
      addGuestTodoHandler(state.enteredTask);
      
      //resetting input field
      setEnteredTask("");
    }
  };

  //Sort user todos by completion status
  const sortedUserTodos = sortTodosByCompletion(userCtx.tasksList);

  //Sort guest todos by completion status
  const sortedGuestTodos = sortTodosByCompletion(userCtx.guestTodos);

  //Every time enteredTasksList changes, save it to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.enteredTasksList));
  }, [state.enteredTasksList])
  
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
          task={state.enteredTask}
          change={changeHandler}
          name="Add task"
        />
      </form>
    </div>
  );
};

export default ToDoCard;
