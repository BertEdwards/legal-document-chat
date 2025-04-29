"use client";

import React, { useState } from "react";
import styles from "./button.module.css"

export interface ButtonPropsLink {
  href: string
}

export interface ButtonProps {
  text: string
  type?: "submit" | "reset" | "button"
  onPress?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => boolean
  link?: ButtonPropsLink
  custom_styles?: { [key: string]: string }
  mouseover_styles?: { [key: string]: string }
}

export default function Button({ text, type, onPress, link, custom_styles, mouseover_styles }: ButtonProps) {
  const [mouseOver, setMouseOver] = useState<boolean>(false);
  return link ? (
    <a href={link.href} className={styles.button} style={mouseOver ? { ...custom_styles, ...mouseover_styles } : custom_styles} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      {text}
    </a>
  ) : (
    <button type={type} className={styles.button} style={mouseOver ? { ...custom_styles, ...mouseover_styles } : custom_styles} onMouseEnter={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)} onClick={(e) => onPress ? onPress(e) : {}}>
      {text}
    </button>
  );
}