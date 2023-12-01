import React, { useState, useCallback } from "react";
import classes from "./NewTasks.module.css";

import check from "../../../assets/check.png";
import trash from "../../../assets/trash.png";

const NewTasks = props => {
  // Render completed db column value, which arrives as a string from the fetch call, 
  // to the number 0, thus a falsy value
  const [isCompleted, setIsCompleted] = useState(Number(props.assignment));

  //Retrieve jwt from local storage
  const jwt = localStorage.getItem('jwtToken');

  //Fetch todos from db
  const fetchTodosCallback = useCallback(() => {
    props.fetchTodos();
  }, [props]);

  //Complete todos and update db to reflect their status
  const updateCompleted = async () => {
    try {
     
      //isCompleted state updating function
      setIsCompleted(prevIsCompleted => {
        // Invert the previous isCompleted value
        const updatedIsCompleted = prevIsCompleted === 0 ? 1 : 0;

        // Assemble object with data from the front end to send to server and update the completed column in the SQL table
        const taskIdObj = {
          taskId: props.taskId,
          completed: updatedIsCompleted
        };

        //Fetch request to update the completed column in the todos table
        (async () => {
          try {
            const response = await fetch("http://localhost:8888/todo_backend/update_data-completed.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
              },
              body: JSON.stringify(taskIdObj),
            });

            if (response.ok) {
              fetchTodosCallback();
              console.log("Todo updated successfully!");
            } else {
              console.error("Error:", response.status);
            }
          } catch (error) {
            console.error("Error:", error.message);
          }
        })();

        // Return the new isCompleted value
        return updatedIsCompleted;
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  //Completes todos
  const completeBtnHandler = () => {
    // Call the updateCompleted function
    updateCompleted();
  };

  //Removes todos
  const removeTaskBtnHandler = () => {
   
    const deleteTaskObj = {
      taskId: props.taskId,
    };

    // Run the fetch request to delete the todo record in the todos table
    (async () => {
      
      try {
        const response = await fetch("http://localhost:8888/todo_backend/delete_todo.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
          },
          body: JSON.stringify(deleteTaskObj),
        });

        if (response.ok) {
          fetchTodosCallback();
          console.log("Todo deleted successfully!");
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    })();
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