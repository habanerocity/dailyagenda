import React from "react";

import { Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import Register from './Components/pages/Register';
import classes from "./App.module.css";
import Login from "./Components/pages/Login";

const App = () => {
  return (
    <div className={classes.App}>
      <Routes>
        <Route path='/' element={<Home />}>

        </Route>
        <Route path='/Register' element={<Register />}>

        </Route>
        <Route path='/Login' element={<Login />}>

        </Route>
      </Routes>
    </div>
  );
};

export default App;
