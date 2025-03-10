import styles from "./header.module.css" 
import { List } from "react-bootstrap-icons";

export default function Header() {
  return (
    <header className={styles.header_wrapper}>
      <h1 className={styles.header_title}>
        Fayrox
      </h1>
      <List className={styles.header_menu}/>
    </header>
  );
}