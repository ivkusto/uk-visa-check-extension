import { Component } from "solid-js";
import styles from "./styles/popup.module.css";
import Header from "./components/popup/header/header";
import CSVLoader from "./components/popup/csv-loader/csv-loader";

const Popup: Component = () => {
  return (
    <div class={styles.wrapper}>
      <Header />
      <CSVLoader />
    </div>
  );
};

export default Popup;
