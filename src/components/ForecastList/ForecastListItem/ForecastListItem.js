import styles from "./ForecastListItem.module.css";

export default function ForecastListItem({
  date,
  description,
  icon,
  max,
  min,
}) {
  return (
    <div className={styles.forecastListItem}>
      <h3>{date.substring(5, 10)}</h3>
      <img
        alt="weather-icon"
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
      ></img>
      <h5>{description}</h5>
      <h3>{max}</h3>
      <h3>{min}</h3>
    </div>
  );
}
