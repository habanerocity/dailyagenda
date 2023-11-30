import React, { useState, useEffect, useCallback } from "react";
import classes from "./Home.module.css";

import Header from "../UI/Header";
import UtilityCard from "../UI/WeatherCard";
import Card from "../UI/ToDoCard";

const Home = () => {
  //fetched tasklist from db
  const [tasksList, setTasksList] = useState([]);

  const jwt = localStorage.getItem('jwtToken');

    // Fetch data from your server when the component mounts
    const fetchData = useCallback(async () => {
      try {
        const response = await fetch("http://localhost:8888/todo_backend/fetch_todos.php", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setTasksList(data); // Update state with the fetched data
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    }, [jwt]);

    useEffect(() => {
      fetchData(); // Call the fetch function
    }, [fetchData]);

  const addTaskHandler = val => {
    //New Task Object being put together to send to server, task being received from Card.
    const taskObj = {
      data: val,
      completed: 0
    };
    
    console.log(taskObj);

    // Update the fetch request to send taskObject
    (async () => {
      // const jwt = localStorage.getItem('jwtToken');
      try {
        const response = await fetch("http://localhost:8888/todo_backend/insert_todos.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
          },
          body: JSON.stringify(taskObj),
        });

        if (response.ok) {
          //After successfully inserting, fetch the updated list of todos
          fetchData();
          console.log("Todo inserted successfully!");
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    })();

  };

  const completeTask = (obj) => {
    console.log(obj);
    //new array variable created with state spread out in it
    // const newTasks = [...tasksList];
    //changing property of state slice
    // newTasks[index].completed = 1; //use 1 for true when it comes to tinyint data type

    // const completedTodos = newTasks.filter(task => task.completed === 1);

    // setAccomplishedTasks(completedTodos);

    //setting new property back on state object
    // setTasksList(newTasks);
  };

  const removeTask = index => {
    //new array variable with state spread out in it
    // const removedTask = [...tasksList];
    //removing task from new array variable, according to index
    // removedTask.splice(index, 1);
    //putting edited object back into state
    // setTasksList(removedTask);
  };

  
  return (
    // <div className={classes.overlay}>
    <div className={classes.container}>
      <Header />
      <div className={`${classes.card_holder}`}>
        <Card
          deleteTask={removeTask}
          job={tasksList}
          onAddTask={addTaskHandler}
          finito={completeTask}
        />
        <UtilityCard cardTitle="WEATHER" />
      </div>
    </div>
    // </div>

  );
};

export default Home;
