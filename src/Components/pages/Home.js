import React, { useState, useEffect, useCallback } from "react";
import classes from "./Home.module.css";

import Header from "../UI/Header";
import UtilityCard from "../UI/WeatherCard";
import Card from "../UI/ToDoCard";

const Home = () => {
  //fetched tasklist from db
  const [tasksList, setTasksList] = useState([]);

  const jwt = localStorage.getItem('jwtToken');

    // Fetch data from the server when the component mounts
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
      console.log(tasksList);
    }, [fetchData]);

  //Receives props passed up from child components, then makes request to db and inserts tasks into todo table
  const addTaskHandler = val => {
    //New Task Object being put together to send to server, task being received from child components.
    const taskObj = {
      data: val,
      completed: 0
    };

    // Update the fetch request to send taskObject
    (async () => {
      
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

  return (
    // <div className={classes.overlay}>
    <div className={classes.container}>
      <Header />
      <div className={`${classes.card_holder}`}>
        <Card
          //Passing down tasks retrieved from db as props
          job={tasksList}
          //Passing down fetchData function as props
          fetchTasks={fetchData}
          //Receiving todos from Form component
          onAddTask={addTaskHandler}
        />
        <UtilityCard cardTitle="WEATHER" />
      </div>
    </div>
    // </div>

  );
};

export default Home;
