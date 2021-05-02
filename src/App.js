import { useState } from "react";
import styles from "./App.module.css";
import Card from "./UI/Card/Card";
import SearchForm from "./components/SearchForm/SearchForm";
import ForecastList from "./components/ForecastList/ForecastList";

function App() {
  const [forecastInfo, setForecastInfo] = useState([]);

  async function fetchForecastHandler(e) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${e.city},${e.country}&units=imperial&appid=2c3448653d26657e8f7d970848003330`)
    const data = await response.json();

    console.log(data);
  }
  return (
    <div className={styles.App}>
      <Card className={styles.Forecast}>
        <SearchForm onFetchForecast={fetchForecastHandler} />
        <ForecastList  />
      </Card>
    </div>
  );
}

export default App;
