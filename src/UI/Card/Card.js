import styles from "./Card.module.css";
import { React } from "react";

export default function Card({ children, className }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}
