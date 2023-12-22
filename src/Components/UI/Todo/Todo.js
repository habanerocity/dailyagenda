import React, { useState, useContext } from "react";

import useApiRequest from "../../../hooks/useApiRequest";
import useApiUrl from "../../../hooks/useApiUrl";

import classes from "./Todo.module.css";

import { UserContext } from "../../../store/user-context";

import check from "../../../assets/check.svg";
import trash from "../../../assets/red_trash-2.svg";

const Todo = props => {
  // Render completed db column value, which arrives as a string from the fetch call, 
  // and convert to the number 0, thus a falsy value
  const [isCompleted, setIsCompleted] = useState(Number(props.assignment));

  //Import user context from store
  const userCtx = useContext(UserContext);

  //Complete guest todos and update state to reflect their status
  const completeGuestTodo = () => {
    //New array variable created with state spread out in it
    const newGuestTodos = [...userCtx.guestTodos];
    
    // Find the todo to mark as completed
    const todoToComplete = newGuestTodos.find(todo => todo.id === props.taskId);

    // Check if the todo is already completed
    if (todoToComplete.completed) {
      return;
    }
  
    // Mark the todo as completed
    todoToComplete.completed = true;

    //Set the completedAt property to the current date and time
    todoToComplete.completedAt = new Date().toISOString();
    
    //Set new property back on state object
    userCtx.setGuestTodos(newGuestTodos);
  };

  const removeGuestTodo = () => {
    //New array variable with state spread out in it
    const alteredGuestTodos = [...userCtx.guestTodos];

    //Find the index of the todo to delete
    const indexToDelete = alteredGuestTodos.findIndex(todo => todo.id === props.taskId);

    //Removing task from new array variable, according to index of todo that will be deleted
    alteredGuestTodos.splice(indexToDelete, 1);

    //Putting edited object back into state
    userCtx.setGuestTodos(alteredGuestTodos);
  };

   //Complete todos and update db to reflect their status
   const updateCompleted = () => {
    //isCompleted state updating function
    setIsCompleted(prevIsCompleted => {
      //Invert the previous isCompleted value
      const updatedIsCompleted = prevIsCompleted === 0 ? 1 : 0;

      //Assemble object with data from the front end to send to server and update the completed column in the SQL table
      const taskIdObj = {
        taskId: props.taskId,
        completed: updatedIsCompleted,
        completedAt: updatedIsCompleted ? new Date().toISOString() : null
      };

      //Call completeTodos function which sends completed todos to db
      completeTodos(taskIdObj);

      //Return the new isCompleted value
      return updatedIsCompleted;
    });
  };

  //Call useApiUrl to construct api url
  const constructApiUrl = useApiUrl();

  //Construct url endpoints
  const completeTodosUrl = constructApiUrl("update_data-completed.php");
  const deleteTodosUrl = constructApiUrl("delete_todo.php");

  //Call useApiRequest to complete todos
  const completeTodosRequest = useApiRequest(completeTodosUrl, "PUT");
  
  //Call useApiRequest to delete todos
  const deleteTodosRequest = useApiRequest(deleteTodosUrl, "DELETE");

  //Send completed todos to db
  const completeTodos = async (val) => {
    completeTodosRequest(val);
  };

  //Delete todos from db
  const deleteTodos = (taskId) => {
    deleteTodosRequest({ taskId });
  };

  //Completes todos
  const completeBtnHandler = () => {
    if(userCtx.jwt){
      //Incomplete todos are true, and complete todos are false
      //If there are incomplete todos, perform the following
      if(!Number(props.assignment)){
        //Mark todos as complete, rendering a strike through the todo
        updateCompleted();
      }
    }
  };

  //Removes todos from db
  const removeTaskBtnHandler = () => {
    if(userCtx.jwt){
      deleteTodos(props.taskId);
    }
  };

  //Determine if todo is completed, registered user todo or guest user todo
  const completed = isCompleted || (userCtx.guestUser.isGuest && props.assignment);

  return (
    <div className={classes.toDo}>
      <div
        style={{
          textDecoration: completed ? "line-through" : "none",
          textDecorationColor: completed ? "#fb8f0d" : "none"
        }}
        className={classes.task}
      >
        {props.toDoDescription}
      </div>
      <div className={classes.btn__container}>
        {/* ! operator here negates the value, coverts it to its opposite boolean value(Truthy values become false, falsy values become true). !! operator converts a number to a boolean, a truthy value to true and a falsy value to false */}
        <div className={classes.btn__complete} disabled={!!props.assignment} onClick={(userCtx.guestUser.isGuest && !props.assignment && completeGuestTodo) || (userCtx.jwt && completeBtnHandler)}>
          {!completed ? <img alt="complete" className={classes.icon} src={check} /> : null}
        </div>
        <div className={classes.btn__trash} onClick={(userCtx.jwt && removeTaskBtnHandler) || (userCtx.guestUser.isGuest && removeGuestTodo)}>
          <img alt="delete" className={classes.icon} src={trash} />
        </div>
      </div>
    </div>
  );
};

export default Todo;