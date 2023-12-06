import React, { useState, useCallback, useEffect } from "react";

import { Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import Register from './Components/pages/Register';
import classes from "./App.module.css";
import Login from "./Components/pages/Login";

import { UserContext } from './store/user-context';

const App = () => {
  console.log('app.js is rendering');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasksList, setTasksList] = useState([]);
  const [isCompleted, setIsCompleted] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [userFullName, setUserFullName] = useState('');

  const handleIsLoggedIn = () => {
    isLoggedIn ? setIsLoggedIn(false): setIsLoggedIn(true);
  }

  const handleRedirectToLogin = () => {
    redirectToLogin ? setRedirectToLogin(false): setRedirectToLogin(true);
  }

  const handleTasksList = (newTasksList) => {
    setTasksList(newTasksList);
  }

  const handleSetUserFullName = (val) => {
    setUserFullName(val);
  }

  const handleIsCompleted = (val) => {
    setIsCompleted(val);
  };

  const addTaskHandler = (val) => {
    sendTaskToDb(val);
  };

  // Function to construct API URL
  const constructApiUrl = (scriptName) => {
    return `http://localhost:8888/todo_backend/${scriptName}`;
  };
  // Retrieve the user's full name from local storage

  const storedFullName = localStorage.getItem("userFullName");
  
  useEffect(() => {
    // Update the context or state with the retrieved full name
    if (storedFullName) {
      // Update the context or state with the user's full name
      setUserFullName(storedFullName);
    }
  }, [storedFullName]);

  //Retrieve jwt from local storage
  const jwt = localStorage.getItem('jwtToken');

  useEffect(() => {
    if(jwt){
      console.log('jwt is present in app.js!', jwt);
      setIsLoggedIn(true);
      setRedirectToLogin(false);
    }
  }, [jwt])

  // Fetch data from the server when the component mounts
  const fetchData = useCallback(async () => {
    const url = constructApiUrl("fetch_todos.php");
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setTasksList(data); // Update state with the fetched data
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }, [jwt]);

  useEffect(() => {
    if(jwt){
      fetchData();
    }
  }, []);

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
  
  const userCtxValue = {
    isLoggedIn: isLoggedIn, 
    userFullName: userFullName,
    setIsLoggedIn: handleIsLoggedIn,
    tasksList: tasksList,
    setTasksList: handleTasksList,
    isCompleted: isCompleted,
    setIsCompleted: handleIsCompleted,
    fetchData: fetchData,
    addTaskHandler: addTaskHandler,
    setRedirectToLogin: handleRedirectToLogin,
    redirectToLogin: redirectToLogin,
    setUserFullName: handleSetUserFullName,
    constructApiUrl: constructApiUrl
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