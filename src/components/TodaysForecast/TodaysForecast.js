import styles from "./TodaysForecast.module.css";
import Card from "../../UI/Card/Card";

export default function TodaysForecast({
  date,
  temp,
  max,
  min,
  feelsLike,
  humidity,
  description,
  icon,
  day,
}) {
  return (
    <Card className={styles.todaysForecast}>
      <section className={styles.leftSection}>
        <h3>Today</h3>
        <img
          alt="weather-icon"
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        ></img>
        <h5>{description}</h5>
        <h5>{temp}F</h5>
      </section>
      <section className={styles.rightSection}>
        <h5>Feels Like: {feelsLike}F</h5>
        <h5>Hi: {max}F</h5>
        <h5>Lo: {min}F</h5>
        <h5>Humidity: {humidity}%</h5>
      </section>
    </Card>
  );
}
