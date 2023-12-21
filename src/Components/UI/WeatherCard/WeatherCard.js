import React, { useState, useEffect, useCallback, useRef } from "react";

import Card from "../Card/Card";

import classes from "./WeatherCard.module.css";

import sunrise from "../../../assets/whitesunrise.png";
import sunset from "../../../assets/whitesunset.png";

const WeatherCard = () => {
  //Initialize weather state variables
  const [weather, setWeather] = useState({});
  const [hasError, setError] = useState(false);

  //Add a flag to track whether the component is still mounted
  const isMounted = useRef(true);

  //Set the flag to false when the component is unmounted
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  //API values
  const api = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: process.env.REACT_APP_WEATHER_API_BASE,
    days: process.env.REACT_APP_WEATHER_API_DAYS
  };

  //Days of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  //Fetch weather data
  const fetchWeather = useCallback(() => {
    const savePositionToState = async (position) => {
      try {
        const response = await fetch(
          `${api.base}/forecast.json?key=${api.key}&q=${position.coords.latitude},${position.coords.longitude}&days=${api.days}`
        );
        const data = await response.json();
        //Only update the state if the component is still mounted
        if(isMounted.current){
          setWeather(data);
        }
      } catch (error) {
        if(isMounted.current){
          setError(true);
        }
      }
    };
  
    //Get current position of user
    try {
      window.navigator.geolocation.getCurrentPosition(savePositionToState);
    } catch (err) {
      console.error(err);
    }
  }, [api.base, api.days, api.key]);
  
  //Fetch weather when component mounts
  useEffect(() => {
    fetchWeather();
    
    const intervalId = setInterval(() => {
      fetchWeather();
    }, 15 * 60 * 1000); // Fetch every 15 minutes
  
    return () => {
      clearInterval(intervalId); // Cleanup on unmount
    };
    
  }, [fetchWeather]);

  return (
    <Card headerName="Weather">
      {weather.forecast ? (
        <div className={classes.weather_info}>
          <h1 className={classes.location}>
            {`${weather.location.name},`}
          </h1>
          <h1 className={classes.country}>{weather.location.country}</h1>
          <div className={classes.temperature}>
            {`${Math.round(weather.current.temp_f)}°F`}
          </div>
          <h5 className={classes.weather_condition}>
            {`${weather.current.condition.text}`}
          </h5>
          <div className={classes.highLow}>
            <h3 className={classes.high}>
              {`H:${Math.round(weather.forecast.forecastday[0].day.maxtemp_f)}° L:${Math.round(weather.forecast.forecastday[0].day.mintemp_f)}°`}
            </h3>
          </div>
          <div >
            <span className={classes.icon}>
              <img className={classes.sun} src={sunrise} alt="sunrise" />
              <h3 className={classes.substring}>
                {weather.forecast.forecastday[0].astro.sunrise.substring(1)}
              </h3>
            </span>
            <span className={classes.icon}>
              <img className={classes.sun} src={sunset} alt="sunset" />
              <h3 className={classes.substring}>
                {weather.forecast.forecastday[0].astro.sunset.substring(1)}
              </h3>
            </span>
          </div>
          <div className={classes.forecast}>
            <div className={classes.tomorrow}>
              <h3 className={classes.day}>Tomorrow</h3>
              <img className={classes.weather_pic} alt="weather conditions" src={`https://${weather.forecast.forecastday[1].day.condition.icon}`} />
              <div className={classes.highLow}>
                <h3 className={classes.max}>
                  {`H:${Math.round(weather.forecast.forecastday[1].day.maxtemp_f)}° L:${Math.round(weather.forecast.forecastday[1].day.mintemp_f)}°`}
                </h3>
              </div>
            </div>
            <div className={classes.day_after_tomorrow}>
              <h3 className={classes.day}>
                {days[new Date(weather.forecast.forecastday[2].date).getUTCDay()]}
              </h3>
              <img className={classes.weather_pic} alt="weather conditions" src={`https://${weather.forecast.forecastday[2].day.condition.icon}`} />
              <div className={classes.highLow}>
                <h3 className={classes.max}>
                  {`H:${Math.round(weather.forecast.forecastday[2].day.maxtemp_f)}° L:${Math.round(weather.forecast.forecastday[2].day.mintemp_f)}°`}
                </h3>
              </div>
            </div>
          </div>
        </div>
      ) : (
          <div className={classes.valid_location}>
            {hasError ? <h1>Error</h1> : <h1>Getting Location...</h1>}
            <div>Please Enable Location Services</div>
            {hasError ? '' : <div className={classes.loading}></div>}
          </div>
        )}
    </Card>
  );
};

export default WeatherCard;
