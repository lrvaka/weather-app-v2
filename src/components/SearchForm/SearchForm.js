import React, { useState, useRef } from "react";

import styles from "./SearchForm.module.css";
import Card from "../../UI/Card/Card";
import ErrorModal from "../../UI/ErrorModal/ErrorModal";
import searchIcon from "../../assets/magnifying-glass.png";

export default function SearchForm({ onFetchForecast }) {
  const cityInputRef = useRef(); //Ref allows for rendering only when the form is submitted, with one value
  const countryInputRef = useRef();
  const [error, setError] = useState();

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let cityInput = cityInputRef.current.value;
    let countryInput = countryInputRef.current.value;

    if (cityInput.trim().length === 0 && countryInput.trim().length === 0) {
      setError({
        title: "Missing city & country",
        message: "Please enter a city & country",
      });
      console.log(error);
      return;
    }

    if (cityInput.length === 0) {
      setError({
        title: "Missing city",
        message: "Please enter a city alongside the country",
      });
      console.log(error);
      return; //Checks if the input was empty, returns and exits the function if empty
    }

    if (countryInput.trim().length === 0) {
      setError({
        title: "Missing country",
        message: "Please enter a country alongside the city",
      });
      console.log(error);
      return;
    }

    const weatherLocation = {
      city: cityInputRef.current.value,
      country: countryInputRef.current.value,
    };
    console.log(weatherLocation);
    onFetchForecast(weatherLocation);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={styles.container}>
        <form className={styles.searchForm} onSubmit={onSubmitHandler}>
          <input
            name="city"
            type="text"
            placeholder="city"
            ref={cityInputRef}
          />
          <input
            name="country"
            type="text"
            placeholder="country"
            ref={countryInputRef}
          />
          <button type="submit">
            <img src={searchIcon} alt="search icon" />
          </button>
        </form>
      </Card>
    </React.Fragment>
  );
}
