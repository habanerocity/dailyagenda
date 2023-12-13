import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../../store/user-context";

import { useNavigate } from "react-router-dom";

import classes from "./Home.module.css";

import Header from "../../UI/Header/Header";
import WeatherCard from "../../UI/WeatherCard/WeatherCard";
import TodoCard from "../../UI/TodoCard/ToDoCard";

const Home = () => {
  
const navigate = useNavigate();

  const userCtx = useContext(UserContext);

  useEffect(() => {
    // Check if there is a guest ID in local storage 
    const storedGuestId = localStorage.getItem("guestId");

    if (storedGuestId) {
      // If user is guest user and a guest ID is found, use it
      userCtx.setGuestUser({
        isGuest: true,
        guestId: storedGuestId,
      });

    } else if (userCtx.guestUser.isGuest) {
      // If user is a guest user and no guest ID is found, generate a new one
      userCtx.setGuestUserInfo();
    }

    // If user is not a guest user nor a registered user, navigate to login page
    if(!userCtx.guestUser.isGuest && !userCtx.jwt){
        navigate("/Login");
    }
  }, [userCtx.guestUser.isGuest, navigate]);
  

  return (
  
    <div className={classes.container}>
      <Header />
      <div className={classes.card_holder}>
        <TodoCard />
        <WeatherCard cardTitle="WEATHER" />
      </div>
    </div>

  );
};

export default Home;
