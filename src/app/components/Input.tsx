import React from "react";
import styles from "./styles.module.css";
import { combineClasses } from "../util";
import { MONO_FONT } from "../fonts";

export interface InputProps {
  value: string;
  placeholder?: string;
  updateValue: (s: string) => void;
  error?: boolean;
  type?: "password" | "email" | "number";
  onBlur?: () => void;
}

export default function Input(props: InputProps) {
  return (
    <input
      value={props.value || ""}
      onChange={(e) => props.updateValue(e.target.value)}
      className={combineClasses(
        styles.inputElement,
        MONO_FONT.className,
        props.error && styles.inputError
      )}
      placeholder={props.placeholder}
      type={props.type || "text"}
      onBlur={props.onBlur}
    />
  );
}
