import React from "react";
import classes from "./Home.module.css";

import Header from "../../UI/Header/Header";
import UtilityCard from "../../UI/WeatherCard/WeatherCard";
import Card from "../../UI/TodoCard/ToDoCard";

const Home = () => {
  // console.log('home.js is rendering');

  return (
  
    <div className={classes.container}>
      <Header />
      <div className={classes.card_holder}>
        <Card />
        <UtilityCard cardTitle="WEATHER" />
      </div>
    </div>

  );
};

export default Home;
