"use client";

import { useEffect, useState } from "react";
import styles from "./header.module.css"
import { List } from "react-bootstrap-icons"

interface HeaderProps {
}

interface PageData {
  name: string,
  link: string
}

const pages: PageData[] = [
  {
    name: "Get Started",
    link: "/"
  },
  {
    name: "Contact",
    link: "/"
  }
]

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
        <div className={styles.navbar_long_wrapper}>
          {pages.map((page) => (
            <a key={page.name} href={page.link} className={styles.navbar_long}>{page.name}</a>
          ))}
        </div>
      </div>
      <div className={styles.navbar_wrapper}>
        <div className={`${styles.navbar} ${burgerExpanded ? styles.navbar_expanded : ''}`}>
          {pages.flatMap((page, index) => [
            <div className={index !== 0 ? "border_top" : ""} style={{width: "75%", margin: "auto"}}></div>,
            <a key={page.name} href={page.link} className={styles.navbar_element}>{page.name}</a>
          ])}
        </div>
      </div>
    </header>
  );
}