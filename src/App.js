import { React, useState } from "react";
import styles from "./App.module.css";
import Card from "./UI/Card/Card";
import SearchForm from "./components/SearchForm/SearchForm";
import ForecastList from "./components/ForecastList/ForecastList";

function App() {
  const [forecastInfo, setForecastInfo] = useState([]);
  const [todaysForecast, setTodaysForecast] = useState([]);

  const useMyLocationHandler = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setForecastInfo("Geolocation is not supported by this browser.");
    }

    async function showPosition(position) {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=2c3448653d26657e8f7d970848003330`
      );
      if (!response.ok) {
        //Location not found function here, probably gonna pass to a modal inside ForecastList component
        return;
      }
      let data = await response.json();

      let responseToday = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=2c3448653d26657e8f7d970848003330`
      );
      if (!responseToday.ok) {
        //Location not found function here, probably gonna pass to a modal inside ForecastList component
        return;
      }
      let dataToday = await responseToday.json();


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

      let tempDay = new Date();
      tempDay.setDate(tempDay.getDate());
      tempDay = tempDay.toISOString();
      tempDay = tempDay.substring(0, 10);

      let forecastToday = {
        temp: dataToday.main.temp,
        max: dataToday.main.temp_max,
        min: dataToday.main.temp_min,
        date: tempDay,
        humidity: dataToday.main.humidity,
        feels_like: dataToday.main.feels_like,
        description: dataToday.weather[0].description,
        icon: dataToday.weather[0].icon,
      };

      setTodaysForecast(() => {
        return [forecastToday];
      });

      const filteredFinal = [];

      for (let i = 1; i <= 4; i++) {
        // Only pulling out a 3-day forecast because the info
        let tempDay = new Date();
        tempDay.setDate(tempDay.getDate() + i);
        tempDay = tempDay.toISOString();
        tempDay = tempDay.substring(0, 10);

        let dayName = new Date();
        dayName.setDate(dayName.getDate() + i);
        dayName = dayName.toString();
        dayName = dayName.substring(0, 3);

        filteredFinal.push({
          date: tempDay,
          day: dayName,
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
    }
  };

  async function fetchForecastHandler(e) {

    let responseToday = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${e.city},${e.country}&units=imperial&appid=${process.env.REACT_APP_SECRET_KEY}`
    );
    if (!responseToday.ok) {
      //Location not found function here, probably gonna pass to a modal inside ForecastList component
      return;
    }
    let dataToday = await responseToday.json();

    let dayName = new Date();
    dayName.setDate(dayName.getDate());
    dayName = dayName.toString();
    dayName = dayName.substring(0, 3);

    let forecastToday = {
      temp: dataToday.main.temp,
      max: dataToday.main.temp_max,
      min: dataToday.main.temp_min,
      day: dayName,
      humidity: dataToday.main.humidity,
      feels_like: dataToday.main.feels_like,
      description: dataToday.weather[0].description,
      icon: dataToday.weather[0].icon,
    };

    setTodaysForecast(() => {
      return [forecastToday];
    });

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${e.city},${e.country}&units=imperial&appid=${process.env.REACT_APP_SECRET_KEY}`
    );
    if (!response.ok) {
      //Location not found function here, probably gonna pass to a modal inside ForecastList component
      return;
    }
    let data = await response.json();

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

    for (let i = 1; i <= 4; i++) {
      let tempDay = new Date();
      tempDay.setDate(tempDay.getDate() + i);
      tempDay = tempDay.toISOString();
      tempDay = tempDay.substring(0, 10);

      let dayName = new Date();
      dayName.setDate(dayName.getDate() + i);
      dayName = dayName.toString();
      dayName = dayName.substring(0, 3);

      filteredFinal.push({
        day: dayName,
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

  
  }
  return (
    <div className={styles.app}>
      <Card className={styles.forecast}>
        <SearchForm
          onFetchForecast={fetchForecastHandler}
          onUseMyLocation={useMyLocationHandler}
        />
        <ForecastList
          forecastInfo={forecastInfo}
          todaysForecast={todaysForecast}
        />
      </Card>
    </div>
  );
}

export default App;
