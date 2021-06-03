import Card from "../Card/Card";
import styles from "./ErrorModal.module.css";
import { React } from "react";

export default function ErrorModal({onConfirm, title, message}) {
  return (
    <div>
      <div className={styles.backdrop} onClick={onConfirm}>
          <Card className={styles.modal}>
              <h1>{title}</h1>
              <h1>{message}</h1>
          </Card>
      </div>
    </div>
  );
}
