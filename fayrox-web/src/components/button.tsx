"use client";

import { useState } from "react";
import styles from "./button.module.css"

export interface ButtonProps {
  text: string
  custom_styles?: { [key: string]: string }
  mouseover_styles?: { [key: string]: string }
}

export default function Button({ text, custom_styles, mouseover_styles } : ButtonProps) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  return (
    <button className={styles.button} style={mouseOver ? {...custom_styles, ...mouseover_styles} : custom_styles} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      {text}
    </button>
  );
}