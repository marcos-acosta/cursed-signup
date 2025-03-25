import React from "react";
import styles from "./styles.module.css";
import { combineClasses } from "../util";
import { MONO_FONT } from "../fonts";

export interface InputProps {
  value: string;
  placeholder: string;
  updateValue: (s: string) => void;
  optional?: boolean;
  error?: string | false | undefined;
  password?: boolean;
}

export default function Input(props: InputProps) {
  return (
    <div className={styles.inputAndError}>
      <input
        value={props.value}
        onChange={(e) => props.updateValue(e.target.value)}
        className={combineClasses(
          styles.inputElement,
          MONO_FONT.className,
          props.error && styles.inputError
        )}
        placeholder={`${props.placeholder}${props.optional ? "" : " *"}`}
        type={props.password ? "password" : "text"}
      />
      {props.error && <div className={styles.errorText}>{props.error}</div>}
    </div>
  );
}
