import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hey! <br /> I'm Bhagyashree</h1>
        <p className={styles.description}>
          Welcome to my portfolio! <br /> I am just a begineer in Web Development field and have learnt the very basics of HTML, CSS, JS and now have begin my journey towards REACT.JS. 
          </p>
      </div>
      <img
        src={getImageUrl("hero/heroImage.jpeg")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};