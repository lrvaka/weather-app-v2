import styles from './ForecastListItem.module.css'

export default function ForecastListItem({date, description, icon, max, min}){
    return(
        <div className={styles.forecastListItem}>
        <h1>{date.substring(5, 10)}</h1>
        <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`}></img>
        <h5>{description}</h5>
        <h1>{max}</h1>
        <h1>{min}</h1>
        </div>
    )
}