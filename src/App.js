import React from "react";

import { Routes, Route } from 'react-router-dom';
import Home from './Components/pages/Home';
import Register from './Components/pages/Register';
import classes from "./App.module.css";

const App = () => {
  return (
    <div className={classes.App}>
      <Routes>
        <Route path='/' element={<Home />}>

        </Route>
        <Route path='/Register' element={<Register />}>

        </Route>
      </Routes>
    </div>
  );
};

export default App;
