import React, { useState, useEffect } from "react";

import classes from "./UtilityCard.module.css";

import SearchBar from "../SearchBar";

import sunrise from "../../assets/whitesunrise.png";
import sunset from "../../assets/whitesunset.png";
import sun from "../../assets/sun2.png";
import rain from "../../assets/rain.png";

const UtilityCard = props => {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");

  const api = {
    key: "521a9ac90a6f44be92d203127221306",
    base: "https://api.weatherapi.com/v1",
    days: "3"
  };

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  const savePositionToState = async position => {
    await fetch(
      `${api.base}/forecast.json?key=${api.key}&q=${position.coords.latitude},${position.coords.longitude}&days=${api.days}`
    )
      .then(response => response.json())
      .then(data => {
        setWeather(data);
        console.log(weather);
      });
  };

  const fetchWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();

    return setWeather("");
  }, []);

  const searchForWeather = async location => {
    await fetch(
      `${api.base}/forecast.json?key=${api.key}&q=${location}&days=${api.days}`
    )
      .then(response => {
        response.json();
      })
      .then(data => {
        setWeather(data);
        console.log(weather);
      });

    setCity("");
  };

  const getWeatherData = async e => {
    e.preventDefault();

    try {
      searchForWeather(city);

      await fetch(
        `${api.base}/forecast.json?key=${api.key}&q=${city}&days=${api.days}`
      )
        .then(response => {
          response.json();
        })
        .then(data => {
          setWeather(data);
          console.log(weather);
        });

      setCity("");
    } catch (err) {
      console.error(err);
    }
  };

  const changeHandler = e => {
    //putting input into state variable
    setCity(e.target.value);
    console.log(city);
  };

  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <div>
          <h1 className={classes.header}>{props.cardTitle}</h1>
          <hr />
        </div>

        {weather.forecast ? (
          <div className={classes.weather_info}>
            <h1
              className={classes.location}
            >{`${weather.location.name}, ${weather.location.country}`}</h1>
            <div className={classes.temperature}>{`${Math.round(
              weather.current.temp_f
            )}°F`}</div>
            <h3 className={classes.weather_condition}>
              {`${weather.current.condition.text} `}
            </h3>
            <div className={classes.highLow}>
              <h3 className={classes.high}>{`H:${Math.round(
                weather.forecast.forecastday[0].day.maxtemp_f
              )}°`}</h3>
              <h3>{`L:${Math.round(
                weather.forecast.forecastday[0].day.mintemp_f
              )}°`}</h3>
            </div>
            <div className={classes.sun}>
              <span className={classes.icon}>
                <img src={sunrise} />
                <h5>
                  {weather.forecast.forecastday[0].astro.sunrise.substring(1)}
                </h5>
              </span>
              <span className={classes.icon}>
                <img src={sunset} />
                <h5>
                  {weather.forecast.forecastday[0].astro.sunset.substring(1)}
                </h5>
              </span>
            </div>
            <div className={classes.forecast}>
              <div className={classes.tomorrow}>
                <h3>Tomorrow</h3>
                <img className={classes.weather_pic} src={sun} />
                <div className={classes.highLow}>
                  <h5 className={classes.max}>{`H:${Math.round(
                    weather.forecast.forecastday[1].day.maxtemp_f
                  )}°`}</h5>
                  <h5>{`L:${Math.round(
                    weather.forecast.forecastday[1].day.mintemp_f
                  )}°`}</h5>
                </div>
              </div>
              <div className={classes.day_after_tomorrow}>
                <h3>
                  {
                    days[
                      new Date(weather.forecast.forecastday[2].date).getUTCDay()
                    ]
                  }
                </h3>
                <img className={classes.weather_pic} src={rain} />
                <div className={classes.highLow}>
                  <h5 className={classes.max}>{`H:${Math.round(
                    weather.forecast.forecastday[2].day.maxtemp_f
                  )}°`}</h5>
                  <h5>{`L:${Math.round(
                    weather.forecast.forecastday[2].day.mintemp_f
                  )}°`}</h5>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.valid_location}>Getting location...</div>
        )}
        <form onSubmit={getWeatherData} className={classes.search}>
          <SearchBar
            change={changeHandler}
            task={city}
            name="Search"
            placeholder="Enter your city..."
          />
        </form>
      </div>
    </div>
  );
};

export default UtilityCard;
