import React from "react";
import styles from "./styles.module.css";
import { combineClasses } from "../util";
import { MONO_FONT } from "../fonts";

export interface ButtonProps {
  text: string;
  enabled: boolean;
  onClick: () => void;
  autofocus?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={combineClasses(styles.buttonElement, MONO_FONT.className)}
      disabled={!props.enabled}
      autoFocus={props.autofocus}
    >
      {">"} {props.text}
    </button>
  );
}
