import React, { useState } from "react";

import { Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import Register from './Components/pages/Register';
import classes from "./App.module.css";
import Login from "./Components/pages/Login";

import { UserContext } from './store/user-context';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleIsLoggedIn = () => {
    setIsLoggedIn(true);
  }

  const userCtxValue = {
    isLoggedIn: isLoggedIn, 
    userFullName: '',
    setIsLoggedIn: handleIsLoggedIn
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
