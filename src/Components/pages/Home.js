import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";

import Header from "../UI/Header";
import UtilityCard from "../UI/WeatherCard";
import Card from "../UI/ToDoCard";

const getLocalStorage = () => {
  let tasks = localStorage.getItem("tasks");

  if (tasks) {
    return (tasks = JSON.parse(localStorage.getItem("tasks")));
  } else {
    return [];
  }
};

const Home = () => {
  const [tasksList, setTasksList] = useState(getLocalStorage());
  const [accomplishedTasks, setAccomplishedTasks] = useState([]);

  const addTaskHandler = task => {
    //New Task Object being put together in Parent Component, task being received from Card.
    setTasksList(prevTasksList => {
      return [
        //state array depends on previous state objects
        ...prevTasksList,
        { data: task, id: Math.random().toString(), completed: false }
      ];
    });
  };

  useEffect(() => {
    getLocalStorage();
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }, [tasksList]);

  const completeTask = index => {
    //new array variable created with state spread out in it
    const newTasks = [...tasksList];
    //changing property of state slice
    newTasks[index].completed = true;

    const completedTodos = newTasks.filter(task => task.completed === true);

    setAccomplishedTasks(completedTodos);
    console.log(accomplishedTasks);

    //setting new property back on state object
    setTasksList(newTasks);
  };

  const removeTask = index => {
    //new array variable with state spread out in it
    const removedTask = [...tasksList];
    //removing task from new array variable, according to index
    removedTask.splice(index, 1);
    //putting edited object back into state
    setTasksList(removedTask);
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
