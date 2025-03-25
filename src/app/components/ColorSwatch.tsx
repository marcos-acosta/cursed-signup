import React from "react";
import styles from "./styles.module.css";

export interface ColorSwatchProps {
  color: string | false;
}

export default function ColorSwatch(props: ColorSwatchProps) {
  return (
    <div
      className={styles.colorSwatch}
      style={{ backgroundColor: props.color || "#171717" }}
    ></div>
  );
}
