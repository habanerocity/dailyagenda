import React, { useState, useCallback, useEffect } from "react";

import { Routes, Route, useNavigate } from 'react-router-dom';

import Home from './Components/pages/Home/Home';
import Register from './Components/pages/Register/Register';
import Login from "./Components/pages/Login/Login";

import classes from "./App.module.css";

import { UserContext } from './store/user-context';

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
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('jwtToken'));
  const [tasksList, setTasksList] = useState([]);
  const [isCompleted, setIsCompleted] = useState('');
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [userFullName, setUserFullName] = useState('');

  const [guestTodos, setGuestTodos] = useState(getGuestTodosFromLocalStorage());

  //Initialize guest login state object
  const [guestUser, setGuestUser] = useState({
    isGuest: false,
    // isLoggedIn: false,å
    guestId: ""
  }); 

  //Initialize navigate variable for programmatic navigation
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(guestTodos);

    localStorage.setItem("todos", JSON.stringify(guestTodos));
  }, [guestTodos])

  //Function to generate a unique guest ID
  const generateGuestId = () => {
    return `guest_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Function to set guest user state
  const setGuestUserInfo = () => {
    
    const newGuestId = generateGuestId();

    setGuestUser({
      isGuest: true,
      guestName: 'Guest',
      guestId: newGuestId,
    });

    // You can also save the guest ID to local storage if needed
    localStorage.setItem("guestId", newGuestId);
  }

  // Function to log in as a guest
const handleLogInAsGuest = () => {
  setGuestUserInfo(); // Set guest user information
}

// useEffect hook that runs when guestUser.guestId changes
useEffect(() => {
  if(guestUser.guestId){
    // Retrieve guestTodos from local storage and update state
    let guestTodosFromLocalStorage = getGuestTodosFromLocalStorage();
     // Only update the guestTodos state if the local storage contains todos
     if (guestTodosFromLocalStorage.length > 0) {
      setGuestTodos(guestTodosFromLocalStorage);
    }
    
    navigate("/");
  }
}, [guestUser.guestId, navigate]);

// useEffect hook that runs when the component is mounted
useEffect(() => {
  // Retrieve guestTodos from local storage and update state
  let guestTodosFromLocalStorage = getGuestTodosFromLocalStorage();
  setGuestTodos(guestTodosFromLocalStorage);
}, []);

  //Invert the state of isLoggedIn
  const handleIsLoggedIn = () => {
    if(isLoggedIn){
      setIsLoggedIn(false);
    } else if(!isLoggedIn){
      setIsLoggedIn(true);
    }
  }

  const handleSetIsLoggedInToFalse = useCallback(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);
 
  
  //Invert the state of redirectToLogin
  const handleRedirectToLogin = () => {
    redirectToLogin ? setRedirectToLogin(false): setRedirectToLogin(true);
  }

  const handleTasksList = (newTasksList) => {
    setTasksList(newTasksList);
  }

  const handleGuestTodos = (newGuestTodos) => {
    setGuestTodos(newGuestTodos);
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

  //Retrieve jwt from local storage
  const jwt = localStorage.getItem('jwtToken');

  //Generalized function to construct API URL
  const constructApiUrl = (scriptName) => {
    return `http://localhost:8888/todo_backend/${scriptName}`;
  };

  // Retrieve the user's full name from local storage
  const storedFullName = localStorage.getItem("userFullName");
  
  //If registered user is logged in fetch data from the server when the component mounts
  const fetchData = useCallback(async () => {
    if(jwt){
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
  }
  }, [jwt]);

  //Function that sends todos to the db
  const sendTaskToDb = async (val) => {
    if(jwt){

    //Initialize task object to send todos to db
    const taskObj = {
      data: val,
      completed: 0
    };

    const url = constructApiUrl("insert_todos.php");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(taskObj),
      });

      if (response.ok) {
        //After successfully inserting todos in db, fetch the updated list of todos from db
        fetchData();
        console.log("Todo inserted successfully!");
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  };

  useEffect(() => {
    if(jwt){
      fetchData();
    }
  }, [jwt]);

  useEffect(() => {
    // Update the context or state with the retrieved full name
    if (jwt && storedFullName) {
      setUserFullName(storedFullName);
    }
  }, [storedFullName]);
  

  useEffect(() => {
    //If jwt is detected, set isLoggedIn to true and redirectToLogin to false
    if(jwt && !isLoggedIn){
      console.log('jwt is present in app.js!', jwt);
      setIsLoggedIn(true);
      setRedirectToLogin(false);
      navigate("/");
    }
  }, [jwt, isLoggedIn, navigate])

  //UserContext Value
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
    constructApiUrl: constructApiUrl,
    jwt: jwt,
    guestUser: guestUser,
    logInAsGuest: handleLogInAsGuest,
    setGuestUserInfo: setGuestUserInfo,
    setGuestUser: setGuestUser,
    guestTodos: guestTodos,
    setGuestTodos: handleGuestTodos,
    setIsLoggedInToFalse: handleSetIsLoggedInToFalse,
    getGuestTodosFromLocalStorage: getGuestTodosFromLocalStorage
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