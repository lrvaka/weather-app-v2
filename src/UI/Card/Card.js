import styles from "./Card.module.css";

export default function Card({ children, className }) {
  return <div className={`${styles.Card} ${className}`}>{children}</div>;
}
