import HomeIcon from "../../assets/grupoeco/img/home.png";

import React from "react";
import { Link } from "react-router-dom";

import styles from "./HomeButton.module.scss";

export const HomeButton = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <Link to="/">
          <img src={HomeIcon} alt="home" />
        </Link>
      </div>
    </div>
  );
};
