"use client";

import { useEffect, useState } from "react";
import styles from "./header.module.css"
import { List } from "react-bootstrap-icons";

interface HeaderProps {
}

export default function Header({ }: HeaderProps) {
  const [burgerExpanded, setBurgerExpanded] = useState<boolean>(false);

  // This makes the dropdown close when the page is scrolled
  useEffect(() => {
    const websiteBody = document.body;

    const handleScroll = () => {
      setBurgerExpanded(false);
    };

    websiteBody?.addEventListener("wheel", handleScroll);

    return () => {
      websiteBody?.removeEventListener("wheel", handleScroll);
    };
  }, [])

  return (
    <header className={styles.header_wrapper} onScroll={e => e.preventDefault()}>
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