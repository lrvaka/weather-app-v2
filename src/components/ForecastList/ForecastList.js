import React from "react";
import Card from "../../UI/Card/Card";
import styles from "./ForecastList.module.css";
import ForecastListItem from "./ForecastListItem/ForecastListItem";

export default function ForecastList({ forecastInfo }) {
  let city = forecastInfo.map((e) => e.city)[0];
  let country = forecastInfo.map((e) => e.country)[0];

  return (
    <Card className={styles.container}>
      <div className={styles.location}>
        <h1>{city ? city + ", " : "Enter a location"}</h1>
        <h1>{country ? country : null}</h1>
      </div>
      <div className={styles["forecast-list"]}>
        {forecastInfo.map((e) => (
          <ForecastListItem
            key={e.date}
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
