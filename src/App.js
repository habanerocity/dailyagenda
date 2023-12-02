import React, { useState, useCallback, useEffect } from "react";

import { Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import Register from './Components/pages/Register';
import classes from "./App.module.css";
import Login from "./Components/pages/Login";

import { UserContext } from './store/user-context';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [isCompleted, setIsCompleted] = useState('');

  const handleIsLoggedIn = () => {
    setIsLoggedIn(true);
  }

  const handleTasksList = (newTasksList) => {
    setTasksList(newTasksList);
  }

  const handleIsCompleted = (val) => {
    setIsCompleted(val);
  };

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
    fetchData(); 
  }, [fetchData]);

  const sendTaskToDb = async (val) => {

    //Initialize task object to send todos to db
    const taskObj = {
      data: val,
      completed: 0
    };

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
  };
  

  const addTaskHandler = (val) => {
 
    sendTaskToDb(val);
  };

  const userCtxValue = {
    isLoggedIn: isLoggedIn, 
    userFullName: '',
    setIsLoggedIn: handleIsLoggedIn,
    tasksList: tasksList,
    setTasksList: handleTasksList,
    isCompleted: isCompleted,
    setIsCompleted: handleIsCompleted,
    fetchData: fetchData,
    addTaskHandler: addTaskHandler
  }

  return (
    <div className={classes.App}>
      <UserContext.Provider value={userCtxValue}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Login' element={<Login />} /> 
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
