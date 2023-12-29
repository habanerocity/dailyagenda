import React, { useContext, useEffect, useReducer } from "react";
import classes from "./ToDoCard.module.css";

import { UserContext } from "../../../store/user-context";

import Card from "../Card/Card";
import InputTodos from "../InputTodos/InputTodos";

// Define initial state
const initialGuestTodoState = {
  enteredTask: '',
  enteredTasksList: [],
};

// Define reducer
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
const sortIncompleteTodos = (todos) => {
  if (!todos) {
    return;
  }

  //Generate new array of incomplete todos based on completion status
  const incompleteTodos = todos.filter(todo => Number(todo.completed) === 0);

  //Return sorted todos
  return incompleteTodos;
}

const ToDoCard = () => {
  // Use the useReducer hook
  const [state, dispatch] = useReducer(reducer, initialGuestTodoState);



  // Define your dispatch actions
  const setEnteredTask = (task) => {
    dispatch({ type: 'SET_ENTERED_TASK', payload: task });
  };

  //Import userContext store
  const userCtx = useContext(UserContext);

  //Change enteredTask state variable every keystroke
  const changeHandler = (e) => {
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
  const sortedUserTodos = sortIncompleteTodos(userCtx.tasksList);

  //Sort guest todos by completion status
  const sortedGuestTodos = sortIncompleteTodos(userCtx.guestTodos);

  //Every time enteredTasksList changes, save it to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.enteredTasksList));
  }, [state.enteredTasksList])
  
  return (
       <Card id={classes.todo_card} headerName="Do" >
        <div className={classes.add_todos}>
          <div className={classes.todo_container}>
            {userCtx.jwt ? userCtx.renderTodos(sortedUserTodos, false) : userCtx.guestUser.isGuest ? userCtx.renderTodos(sortedGuestTodos, true) : null}
          </div>
        <form className={classes.form__input} onSubmit={submitHandler}>
          <InputTodos
            placeholder="Enter a todo..."
            task={state.enteredTask}
            change={changeHandler}
            name="➕ Add todo"
          />
        </form>
      </div>
    </Card>
  );
};

export default ToDoCard;