import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/aboutImage.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/learn.png")} alt="Learn icon" />
            <div className={styles.aboutItemText}>
              <h3>Learning and executing</h3>
              <p>
                I'm a learning developer, interested more in back-end also wishes to do front-end too. This is one of my best websites and I'm hoping more to be added in the list.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/other_skill.png")} alt="Skills icon" />
            <div className={styles.aboutItemText}>
              <h3>Other Skills</h3>
              <p>
                Aside from the mentioned Skills below I have learnt and developed small projects on other languages. <br />I have worked on small project using language 'C#'. 
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};