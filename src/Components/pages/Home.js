import React, { useEffect, useContext } from "react";
import classes from "./Home.module.css";

import { UserContext } from "../../store/user-context";

import Header from "../UI/Header";
import UtilityCard from "../UI/WeatherCard";
import Card from "../UI/ToDoCard";

const Home = () => {

  //Import userContext store
  const userCtx = useContext(UserContext);

  const jwt = localStorage.getItem('jwtToken');
  
  // Call the fetchData function which lives in the context store and fetches todos from db
    useEffect(() => {
      if(jwt){
        userCtx.fetchData(); 
      }
    }, [userCtx.fetchData]);

  return (
    // <div className={classes.overlay}>
    <div className={classes.container}>
      <Header />
      <div className={classes.card_holder}>
        <Card />
        <UtilityCard cardTitle="WEATHER" />
      </div>
    </div>
    // </div>

  );
};

export default Home;
