"use client";

import { useState } from "react";
import styles from "./header.module.css"
import { List } from "react-bootstrap-icons";

export default function Header() {
  const [burgerExpanded, setBurgerExpanded] = useState<boolean>(false);

  return (
    <header className={styles.header_wrapper}>
      <div className={styles.title_wrapper}>
        <h1 className={styles.header_title}>
          Fayrox
        </h1>
        <List className={styles.header_menu} onClick={() => setBurgerExpanded(prev => !prev)} />
      </div>
      <div className={styles.navbar_wrapper}>
        <div className={`${styles.navbar} ${burgerExpanded ? styles.navbar_expanded : ''}`}>
          <div className={styles.navbar_element}>Get Started</div>
          <div className={styles.navbar_element}>Contact</div>
        </div>
      </div>
    </header>
  );
}