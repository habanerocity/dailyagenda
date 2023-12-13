import React, { useState, useEffect } from "react";

import useApi from "./hooks/useApi";

import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './Components/pages/Home/Home';
import Register from './Components/pages/Register/Register';
import Login from "./Components/pages/Login/Login";

import classes from "./App.module.css";

import { UserContext } from './store/user-context';

// Retrieve guest todos from local storage, if none are found return an empty array
const getGuestTodosFromLocalStorage = () => {
  let guestTodos = localStorage.getItem("todos");
  
  if (guestTodos) {
    return (guestTodos = JSON.parse(localStorage.getItem("todos")));
  } else {
    return [];
  }
};

const App = () => {
  console.log('app.js is rendering');

  //Initialize state variables
  
  // Check to see if there is a jwt in local storage, then set isLoggedIn to true if jwt is found. !! operator is a common way to convert a value to a boolean in js
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtToken'));
  
  //Stores registered user's todos that is retrieved from db
  const [tasksList, setTasksList] = useState([]);

  //State variable that tracks a registered user's todos completion status
  const [isCompleted, setIsCompleted] = useState('');

  //State variable that is a boolean value and if true redirects to Login page
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  //State variable that tracks a registered user's full name
  const [userFullName, setUserFullName] = useState('');

  //State variable that tracks a guest user's todos
  const [guestTodos, setGuestTodos] = useState(getGuestTodosFromLocalStorage());

  //Initialize guest login state object
  const [guestUser, setGuestUser] = useState({
    isGuest: false,
    guestId: ""
  }); 
  
  //Initialize navigate variable for programmatic navigation
  const navigate = useNavigate();

  //Function to generate a unique guest ID
  const generateGuestId = () => {
    return `guest_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Function to set guest user state
  const setGuestUserInfo = () => {
    
    //Variable that stores a unique guest ID
    const newGuestId = generateGuestId();

    //Set guest user state
    setGuestUser({
      isGuest: true,
      guestId: newGuestId
    });

    //Saves guest ID to local storage
    localStorage.setItem("guestId", newGuestId);
  }

  //Set guest user information upon guest login
  const handleLogInAsGuest = () => {
    setGuestUserInfo();
  }

  //Invert the state of isLoggedIn
  const handleIsLoggedIn = () => {
    if(isLoggedIn){
      setIsLoggedIn(false);
    } else if(!isLoggedIn){
      setIsLoggedIn(true);
    }
  }

  //Invert the state of redirectToLogin
  const handleRedirectToLogin = () => {
    redirectToLogin ? setRedirectToLogin(false): setRedirectToLogin(true);
  }

  //Set registered user's todos
  const handleTasksList = (newTasksList) => {
    setTasksList(newTasksList);
  }

  //Set guest user's todos
  const handleGuestTodos = (newGuestTodos) => {
    setGuestTodos(newGuestTodos);
  }

  //Set registered user's full name
  const handleSetUserFullName = (val) => {
    setUserFullName(val);
  }

  //Set registered user's todos completion status
  const handleIsCompleted = (val) => {
    setIsCompleted(val);
  };

  //Function that sends registered user's todos to the db
  const addTaskHandler = (val) => {
    sendTaskToDb(val);
  };

  //Retrieve jwt from local storage
  const jwt = localStorage.getItem('jwtToken');

  // Retrieve the user's full name from local storage
  const storedFullName = localStorage.getItem("userFullName");

  //Initialize function that performs fetchData and sendTaskToDb API requests
  const { fetchData, sendTaskToDb } = useApi(jwt, setTasksList);
  
  //Every time guest ID changes, retrieve guest todos from local storage and update state
  useEffect(() => {
    if(guestUser.guestId){
      // Retrieve guestTodos from local storage and update state
      let guestTodosFromLocalStorage = getGuestTodosFromLocalStorage();
      // Only update the guestTodos state if the local storage contains todos
      if (guestTodosFromLocalStorage.length > 0) {
        setGuestTodos(guestTodosFromLocalStorage);
      }
      
      // Navigate to home page
      navigate("/");
    }
  }, [guestUser.guestId, navigate]);

  //Every time guestTodos changes, save it to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(guestTodos));
  }, [guestTodos])

  //Initialize registered user login
  useEffect(() => {
    if(jwt){
      //Fetch registered user's todos from db
      fetchData();
      //Retrieve guest todos from local storage and update state
      let guestTodosFromLocalStorage = getGuestTodosFromLocalStorage();
      setGuestTodos(guestTodosFromLocalStorage);

      //Update the context or state with the retrieved full name
      if (storedFullName) {
        setUserFullName(storedFullName);
      }

      //Set isLoggedIn to true, redirectToLogin to false, navigate to home page
      setIsLoggedIn(true);
      setRedirectToLogin(false);
      navigate("/");
    }
  }, [jwt, fetchData, navigate, storedFullName]);


  //UserContext Value
  const userCtxValue = {
    isLoggedIn,
    userFullName,
    tasksList,
    isCompleted,
    fetchData,
    addTaskHandler,
    redirectToLogin,
    jwt,
    guestUser,
    setGuestUserInfo,
    setGuestUser,
    guestTodos,
    setIsLoggedIn: handleIsLoggedIn,
    setTasksList: handleTasksList,
    setIsCompleted: handleIsCompleted,
    setRedirectToLogin: handleRedirectToLogin,
    setUserFullName: handleSetUserFullName,
    logInAsGuest: handleLogInAsGuest,
    setGuestTodos: handleGuestTodos,
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