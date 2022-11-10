import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetails = ({ name, capital, area, languages, image }) => {
  const [weather, setWeather] = useState({});
  const [showWeather, setShowWeather] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=75baeb5e4a9787a9404755a3d9f7f7be
        `
      )
      .then((response) => {
        setWeather(response.data);
        setShowWeather(true);
      });
  }, [capital]);

  return (
    <div>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <div>
        <p>
          <strong>languages:</strong>
        </p>
        <ul>
          {Object.values(languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      </div>
      <div>
        <img src={image} alt={name} />
      </div>
      {showWeather && (
        <div>
          <h2>Weather in {capital}</h2>
          <div>temperature {weather.main.temp} Celsius</div>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
