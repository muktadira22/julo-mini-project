import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchLocation, fetchLocationDaily } from "./redux/weather/slice";
import ExampleResponse from "./ExampleCurrent.json";
import ExampleResponseDay from "./Example.json";
import moment from "moment";
import { KtoC } from "./utils/kelvinToCelcius";
import List from "./components/List";
import { ColorExtractor } from "react-color-extractor";
import Layout from "./components/Layout";
import Star from "./assets/icons/star.png";
import StarFull from "./assets/icons/star-full.png";

function App() {
  const dispatch = useDispatch();
  const [currentResponse, setCurrentResponse] = useState(ExampleResponse);
  const [dayResponse, setDayResponse] = useState(ExampleResponseDay.daily);
  const [colors, setColors] = useState({});
  const today = moment();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const thunk = fetchLocation({ lat, lon });
      const thunkDaily = fetchLocationDaily({ lat, lon });
      dispatch(thunk)
        .unwrap()
        .then((res) => {
          setCurrentResponse(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      dispatch(thunkDaily)
        .unwrap()
        .then((res) => {
          setDayResponse(res.data.daily);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, []);

  const getColors = (colors) => {
    console.log(colors);
  };
  return (
    <Layout>
      <div className="location-and-date">
        <h1 className="location-and-date__location">
          {currentResponse.name}{" "}
          <img className="favorite-button" src={StarFull} alt="Start" />
        </h1>
        <div>{today.format("DD MMMM YYYY")}</div>
      </div>

      <div className="current-temperature">
        <div className="current-temperature__icon-container">
          <ColorExtractor getColors={getColors} maxColors={128}>
            <img
              src={`http://openweathermap.org/img/wn/${currentResponse.weather[0].icon}@4x.png`}
              className="current-temperature__icon"
              alt={currentResponse.weather[0].icon}
            />
          </ColorExtractor>
        </div>
        <div className="current-temperature__content-container">
          <div className="current-temperature__value">
            {KtoC(currentResponse.main.temp)}&deg;
          </div>
          <div className="current-temperature__summary">Mostly Sunny</div>
        </div>
      </div>

      <div className="current-stats">
        <div>
          <div className="current-stats__value">
            {KtoC(currentResponse.main.temp_max)}&deg;
          </div>
          <div className="current-stats__label">High</div>
          <div className="current-stats__value">
            {" "}
            {KtoC(currentResponse.main.temp_max)}&deg;
          </div>
          <div className="current-stats__label">Low</div>
        </div>
        <div>
          <div className="current-stats__value">
            {moment.unix(currentResponse.sys.sunrise).format("HH:mm")}
          </div>
          <div className="current-stats__label">Sunrise</div>
          <div className="current-stats__value">
            {moment.unix(currentResponse.sys.sunset).format("HH:mm")}
          </div>
          <div className="current-stats__label">Sunset</div>
        </div>
        <div>
          <div className="current-stats__value">
            {currentResponse.wind.speed}m/s
          </div>
          <div className="current-stats__label">Wind</div>
        </div>
      </div>

      <List data={dayResponse} />
    </Layout>
  );
}

export default App;
