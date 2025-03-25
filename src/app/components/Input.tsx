import React from "react";
import styles from "./styles.module.css";
import { combineClasses } from "../util";
import { MONO_FONT } from "../fonts";
import SideBySide from "./SideBySide";

export interface InputProps {
  value: string;
  placeholder?: string;
  label: string;
  updateValue: (s: string) => void;
  optional?: boolean;
  error?: string | false | undefined;
  password?: boolean;
  children?: JSX.Element;
  splitPercent?: number;
}

export default function Input(props: InputProps) {
  const inputElement = (
    <input
      value={props.value}
      onChange={(e) => props.updateValue(e.target.value)}
      className={combineClasses(
        styles.inputElement,
        MONO_FONT.className,
        props.error && styles.inputError
      )}
      placeholder={props.placeholder}
      type={props.password ? "password" : "text"}
    />
  );

  return (
    <div className={styles.inputAndError}>
      <div className={styles.label}>
        {props.label}
        {props.optional ? "" : "*"}
      </div>
      {props.children ? (
        <SideBySide splitPercent={props.splitPercent}>
          {inputElement}
          {props.children}
        </SideBySide>
      ) : (
        inputElement
      )}
      {props.error && <div className={styles.errorText}>{props.error}</div>}
    </div>
  );
}
