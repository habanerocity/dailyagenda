import React, { useState, useEffect } from "react";
import classes from "./Container.module.css";

import UtilityCard from "./WeatherCard";
import Card from "./ToDoCard";

const getLocalStorage = () => {
  let tasks = localStorage.getItem("tasks");

  if (tasks) {
    return (tasks = JSON.parse(localStorage.getItem("tasks")));
  } else {
    return [];
  }
};

// const shortTime = {
//   timeStyle: "short"
// };

const Container = () => {
  const [tasksList, setTasksList] = useState(getLocalStorage());
  const [accomplishedTasks, setAccomplishedTasks] = useState([]);
  // const [currentTime, setCurrentTime] = useState(
  //   new Date().toLocaleString("en-US", shortTime)
  // );
  // const [currentDate, setCurrentDate] = useState(new Date().toDateString());

  //update the time and date every second
  // setInterval(() => {
  //   setCurrentTime(
  //     new Date().toLocaleString("en-US", shortTime)
  //   );

  //   setCurrentDate(new Date().toDateString());
  // }, 1000);

  const addTaskHandler = task => {
    //New Task Object being put together in Parent Component, task being received from Card.
    setTasksList(prevTasksList => {
      return [
        //state array depends on previous state objects
        ...prevTasksList,
        { data: task, id: Math.random().toString(), completed: false }
      ];
    });
    console.log(tasksList);

  };


  useEffect(() => {
    getLocalStorage();

  
    console.log(tasksList);
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
      <div className={classes.heading}>
        <div>
          <h1 className={classes.daily}>Daily Agenda Todo List</h1>
        </div>
        <div>
          <h1 className={classes.date}>{`${currentDate}, ${currentTime}`}</h1>
        </div>
      </div>
      <hr className={classes.line} />
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

export default Container;
