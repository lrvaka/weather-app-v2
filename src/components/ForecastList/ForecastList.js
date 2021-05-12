import React from "react";
import Card from "../../UI/Card/Card";
import styles from "./ForecastList.module.css";
import ForecastListItem from "./ForecastListItem/ForecastListItem";
import TodaysForecast from "../TodaysForecast/TodaysForecast";

export default function ForecastList({ forecastInfo, todaysForecast }) {
  let city = forecastInfo.map((e) => e.city)[0];
  let country = forecastInfo.map((e) => e.country)[0];

  return (
    <Card className={styles.container}>
      <div className={styles.location}>
        <h1>
          {city ? city + ", " : "Enter a location or use your geo-location"}
          {country ? country : null}
        </h1>
      </div>
      {todaysForecast.map((e) => (
        <TodaysForecast
          key={Math.random()}
          day={e.day}
          temp={e.temp}
          max={e.max}
          min={e.min}
          feelsLike={e.feels_like}
          humidity={e.humidity}
          description={e.description}
          icon={e.icon}
        />
      ))}
      <div className={styles["forecast-list"]}>
        {forecastInfo.map((e) => (
          <ForecastListItem
            key={Math.random()}
            day={e.day}
            date={e.date}
            description={e.description}
            icon={e.icon}
            max={e.max}
            min={e.min}
          />
        ))}
      </div>
    </Card>
  );
}
