import React, { useState, useEffect } from "react";

import classes from "./WeatherCard.module.css";

import sunrise from "../../assets/whitesunrise.png";
import sunset from "../../assets/whitesunset.png";

const UtilityCard = props => {
  const [weather, setWeather] = useState({});
  const [hasError, setError] = useState(false);

  const api = {
    key: "521a9ac90a6f44be92d203127221306",
    base: "https://api.weatherapi.com/v1",
    days: "3"
  };

  const days = [
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
        // console.log(data);
      }).catch(() => {
        setError(true);
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

  return (
    <div className={classes.card}>
      <div className={classes.header_container}>
        <div>
          <h1 className={classes.header}>{props.cardTitle}</h1>
          <hr />
        </div>

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
      </div>
    </div >
  );
};

export default UtilityCard;
