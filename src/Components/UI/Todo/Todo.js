import React, { useState, useContext, useEffect } from "react";
import classes from "./Todo.module.css";

import { UserContext } from "../../../store/user-context";

import check from "../../../assets/check.png";
import trash from "../../../assets/trash.png";

const Todo = props => {
  // console.log('new tasks is rendering...');
  // Render completed db column value, which arrives as a string from the fetch call, 
  // and convert to the number 0, thus a falsy value
  const [isCompleted, setIsCompleted] = useState(Number(props.assignment));

  //import user context from store
  const userCtx = useContext(UserContext);

  const apiRequest = async (url, method, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userCtx.jwt}`
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if(response.ok){
        userCtx.fetchData();
        console.log("Request successful!");
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message );
    }
  };

  //Complete todos and update db to reflect their status
  const updateCompleted = () => {
    //isCompleted state updating function
    setIsCompleted(prevIsCompleted => {
      // Invert the previous isCompleted value
      const updatedIsCompleted = prevIsCompleted === 0 ? 1 : 0;

      // Assemble object with data from the front end to send to server and update the completed column in the SQL table
      const taskIdObj = {
        taskId: props.taskId,
        completed: updatedIsCompleted
      };

      // Call completeTodos function which sends completed todos to db
      completeTodos(taskIdObj);

      // Return the new isCompleted value
      return updatedIsCompleted;
    });
  };

  const completeGuestTodo = () => {
    //new array variable created with state spread out in it
    const newGuestTodos = [...userCtx.guestTodos];
    //changing property of state slice
    newGuestTodos[props.index].completed = true;
    
    //setting new property back on state object
    userCtx.setGuestTodos(newGuestTodos);
  };

  const removeGuestTodo = () => {
    //new array variable with state spread out in it
    const alteredGuestTodos = [...userCtx.guestTodos];
    //removing task from new array variable, according to index
    alteredGuestTodos.splice(props.index, 1);
    //putting edited object back into state
    console.log(alteredGuestTodos);
    userCtx.setGuestTodos(alteredGuestTodos);
  };

  //Send completed todos to db
  const completeTodos = async (val) => {
    const url = userCtx.constructApiUrl("update_data-completed.php");
    apiRequest(url, "POST", val);
  };

  //Delete todos from db
  const deleteTodos = (taskId) => {
    const url = userCtx.constructApiUrl("delete_todo.php");
    apiRequest(url, "POST", { taskId });
  };

  //Completes todos
  const completeBtnHandler = () => {
    if(userCtx.jwt){
      // Call the updateCompleted function
      updateCompleted();
    }
  };

  //Removes todos from db
  const removeTaskBtnHandler = () => {
    if(userCtx.jwt){
      deleteTodos(props.taskId);
    }
  };

  return (
    <div className={classes.toDo}>
      <div
        style={{
          textDecoration: isCompleted || userCtx.guestTodos[props.index]?.completed ? "line-through" : "none",
          textDecorationColor: isCompleted || userCtx.guestTodos[props.index]?.completed ? "#fb8f0d" : "none"
          // textDecoration: isCompleted ? "line-through" : null,
          // textDecorationColor: isCompleted ? "#fb8f0d" : null
        }}
        className={classes.task}
      >
        {props.toDoDescription}
      </div>
      <div className={classes.btn__container}>
        <div className={classes.btn__complete} onClick={(userCtx.jwt && completeBtnHandler) || (userCtx.guestUser.isGuest && completeGuestTodo)}>
          <img alt="complete" className={classes.icon} src={check} />
        </div>
        <div className={classes.btn__trash} onClick={(userCtx.jwt && removeTaskBtnHandler) || (userCtx.guestUser.isGuest && removeGuestTodo)}>
          <img alt="delete" className={classes.icon} src={trash} />
        </div>
      </div>
    </div>
  );
};

export default Todo;