import { useState } from "react";
import styles from "./App.module.css";
import Card from "./UI/Card/Card";
import SearchForm from "./components/SearchForm/SearchForm";
import ForecastList from "./components/ForecastList/ForecastList";

function App() {
  const [forecastInfo, setForecastInfo] = useState([]);

  async function fetchForecastHandler(e) {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${e.city},${e.country}&units=imperial&appid=2c3448653d26657e8f7d970848003330`
    );
    if (!response.ok) {
      //Location not found function here, probably gonna pass to a modal inside ForecastList component
      return;
    }
    let data = await response.json();

    console.log(data);

    let filteredWeather = data.list.map((e) => {
      return {
        date: e.dt_txt.substring(0, 10),
        time: e.dt_txt.substring(11, 19),
        temp_max: e.main.temp_max,
        temp_min: e.main.temp_min,
        description: e.weather[0].description,
        icon: e.weather[0].icon,
      };
    });

    const filteredFinal = [];

    for (let i = 1; i <= 3; i++) {
      // Only pulling out a 3-day forecast because the info
      let tempDay = new Date();
      tempDay.setDate(tempDay.getDate() + i);
      tempDay = tempDay.toISOString();
      tempDay = tempDay.substring(0, 10);

      filteredFinal.push({
        date: tempDay,
        max: Math.max(
          ...filteredWeather
            .filter((element) => {
              return element.date === tempDay;
            })
            .map((element) => {
              return element.temp_max;
            })
        ),
        min: Math.min(
          ...filteredWeather
            .filter((element) => {
              return element.date === tempDay;
            })
            .map((element) => {
              return element.temp_min;
            })
        ),
        description: filteredWeather
          .filter((element) => {
            return element.date === tempDay;
          })
          .filter((element) => {
            return element.time === "12:00:00";
          })[0].description,
        icon: filteredWeather
          .filter((element) => {
            return element.date === tempDay;
          })
          .filter((element) => {
            return element.time === "12:00:00";
          })[0].icon,
        city: data.city.name,
        country: data.city.country,
      });
    }

    setForecastInfo(filteredFinal);

    console.log(forecastInfo);
  }
  return (
    <div className={styles.app}>
      <Card className={styles.forecast}>
        <SearchForm onFetchForecast={fetchForecastHandler} />
        <ForecastList
          forecastInfo={forecastInfo}
        />
      </Card>
    </div>
  );
}

export default App;
