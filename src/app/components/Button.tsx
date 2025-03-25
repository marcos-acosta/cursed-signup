import React from "react";
import styles from "./styles.module.css";
import { combineClasses } from "../util";
import { MONO_FONT } from "../fonts";

export interface ButtonProps {
  text: string;
  enabled: boolean;
  onClick: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={combineClasses(styles.buttonElement, MONO_FONT.className)}
      disabled={!props.enabled}
    >
      {">"} {props.text}
    </button>
  );
}
