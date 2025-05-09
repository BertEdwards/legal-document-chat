"use client";

import { useEffect, useState } from "react";
import styles from "./header.module.css"
import { List } from "react-bootstrap-icons"
import { useWindowSize } from "@/state";
import Link from "next/link";
import { meetingLink } from "@/globals";

interface PageData {
  name: string,
  link: string
}

const pages: PageData[] = [
  {
    name: "Get Started",
    link: meetingLink
  },
  {
    name: "Contact",
    link: "mailto:contact@fayrox.com"
  }
]

export default function Header() {
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

  const windowWidth = useWindowSize().width

  useEffect(() => {
    if (windowWidth >= 900) {
      setBurgerExpanded(false);
    }
  }, [windowWidth])

  return (
    <header className={styles.header_wrapper} onScroll={e => e.preventDefault()}>
      <div className={styles.title_wrapper}>
        <Link href="/">
          <h1 className={styles.header_title}>
            Fayrox
          </h1>
        </Link>
        <List className={styles.header_menu} onClick={() => setBurgerExpanded(prev => !prev)} />
        <div className={styles.navbar_long_wrapper}>
          {pages.map((page) => (
            <a key={page.name} href={page.link} className={styles.navbar_long}>{page.name}</a>
          ))}
        </div>
      </div>
      <div className={styles.navbar_wrapper}>
        <div className={`${styles.navbar} ${burgerExpanded ? styles.navbar_expanded : ''}`}>
          {pages.map((page) => (
            <a key={page.name} href={page.link} className={styles.navbar_element}>{page.name}</a>
          ))}
        </div>
      </div>
    </header>
  );
}