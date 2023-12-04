import React, { useState, useCallback, useContext } from "react";
import classes from "./NewTasks.module.css";

import { UserContext } from "../../../store/user-context";

import check from "../../../assets/check.png";
import trash from "../../../assets/trash.png";

const NewTasks = props => {
  // Render completed db column value, which arrives as a string from the fetch call, 
  // to the number 0, thus a falsy value
  const [isCompleted, setIsCompleted] = useState(Number(props.assignment));

  //import user context from store
  const userCtx = useContext(UserContext);

  //Retrieve jwt from local storage
  const jwt = localStorage.getItem('jwtToken');

  //Fetch todos from db
  const fetchTodosCallback = useCallback(() => {
    if(jwt){
      userCtx.fetchData();
    }
  }, [props]);

  const apiRequest = async (url, method, body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        body: body ? JSON.stringify(body) : undefined
      });

      if(response.ok){
        fetchTodosCallback();
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

        completeTodos(taskIdObj);

        // Return the new isCompleted value
        return updatedIsCompleted;
      });
  };

  // Function to construct API URL
  const constructApiUrl = (scriptName) => {
  return `http://localhost:8888/todo_backend/${scriptName}`;
  };

  //Send completed todos to db
  const completeTodos = async (val) => {
    const url = constructApiUrl("update_data-completed.php");
    apiRequest(url, "POST", val);
  };

  const deleteTodos = (taskId) => {
    const url = constructApiUrl("delete_todo.php");
    apiRequest(url, "POST", { taskId });
  };

  //Completes todos
  const completeBtnHandler = () => {
    // Call the updateCompleted function
    updateCompleted();
  };

  //Removes todos from db
  const removeTaskBtnHandler = () => {
    deleteTodos(props.taskId);
  };

  return (
    <div className={classes.toDo}>
      <div
        style={{
          textDecoration: isCompleted ? "line-through" : null,
          textDecorationColor: isCompleted ? "#fb8f0d" : null
        }}
        className={classes.task}
      >
        {props.toDoDescription}
      </div>
      <div className={classes.btn__container}>
        <div className={classes.btn__complete} onClick={completeBtnHandler}>
          <img alt="complete" className={classes.icon} src={check} />
        </div>
        <div className={classes.btn__close} onClick={removeTaskBtnHandler}>
          <img alt="delete" className={classes.icon} src={trash} />
        </div>
      </div>
    </div>
  );
};

export default NewTasks;