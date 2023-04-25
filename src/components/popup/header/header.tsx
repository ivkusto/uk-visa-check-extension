import { Component } from "solid-js";
import styles from "./header.module.css";

const Header: Component<HeaderProps> = ({}) => {
  return (
    <header class={styles.header}>
      <h1>Visa Sponsorship Data Upload Required</h1>
      <p>
        To fully utilize this extension, please upload the necessary Visa
        sponsorship data. You can obtain the required data from the following
        link:{" "}
        <a
          href="https://uktiersponsors.blob.core.windows.net/excel/UkTiersponsors_All.csv"
          target="_blank"
          class={styles.link}
        >
          uktiersponsors
        </a>
      </p>
    </header>
  );
};

export default Header;

interface HeaderProps {}
