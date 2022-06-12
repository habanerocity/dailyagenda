import classes from "./Container.module.css";

import UtilityCard from "./UtilityCard";
import Card from "./Card";
import TaskCard from "../UI/TaskCard";
import React, { useState, useEffect } from "react";

const getLocalStorage = () => {
  let tasks = localStorage.getItem("tasks");

  if (tasks) {
    return (tasks = JSON.parse(localStorage.getItem("tasks")));
  } else {
    return [];
  }
};

const Container = () => {
  const [tasksList, setTasksList] = useState(getLocalStorage());

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

  const date = new Date();

  const today = date.toLocaleDateString();

  console.log(today);

  return (
    <div className={classes.container}>
      <div className={classes.heading}>
        <div>
          <h1 className={classes.daily}>Daily Agenda Todo List</h1>
        </div>
        <div>
          <h1 className={classes.date}>{today}</h1>
        </div>
      </div>
      <hr className={classes.line} />
      <div className={classes.card_holder}>
        <Card onAddTask={addTaskHandler} />
        <UtilityCard cardTitle="DONE" onAddTask={addTaskHandler} />
        <UtilityCard cardTitle="WEATHER" onAddTask={addTaskHandler} />
      </div>

      {tasksList.length > 0 && (
        <TaskCard
          taskIsDone={completeTask}
          taskRemoved={removeTask}
          //dropping props chain with state
          job={tasksList}
        />
      )}
    </div>
  );
};

export default Container;
