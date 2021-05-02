import { useState } from "react";

import styles from "./SearchForm.module.css";
import Card from "../../UI/Card/Card";
import searchIcon from "../../assets/magnifying-glass.png";
// const onSubmitHandler = (e) => {
//   e.preventDefault();

//   const userData = {
//     user: enteredUser,
//     age: enteredAge,
//   };

//   props.onAddUser(userData);
// };

export default function SearchForm(props) {
  const [enteredCity, setEnteredCity] = useState();
  const [enteredCountry, setEnteredCountry] = useState();

  const cityChangeHandler = (e) => {
    setEnteredCity(e.target.value);
  };

  const countryChangeHandler = (e) => {
    setEnteredCountry(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const weatherLocation = {
      city: enteredCity,
      country: enteredCountry,
    };
    console.log(weatherLocation)
    props.onFetchForecast(weatherLocation);
  };
  return (
    <Card className={styles.Container}>
      <form className={styles.SearchForm} onSubmit={onSubmitHandler}>
        <input
          name="city"
          type="text"
          placeholder="city"
          onChange={cityChangeHandler}
        />
        <input
          name="country"
          type="text"
          placeholder="country"
          onChange={countryChangeHandler}
        />
        <button type="submit">
          <img src={searchIcon} alt="search icon" />
        </button>
      </form>
    </Card>
  );
}
