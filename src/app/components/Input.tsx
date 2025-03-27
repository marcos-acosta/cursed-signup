import React from "react";
import styles from "./styles.module.css";
import { combineClasses, defaultFormatter } from "../util";
import { MONO_FONT } from "../fonts";
import SideBySide from "./SideBySide";
import Slider from "./Slider";

export interface InputProps {
  value: string | number | null;
  placeholder?: string;
  label: string;
  updateValue: (s: any) => void;
  optional?: boolean;
  error?: string | false | undefined;
  password?: boolean;
  slider?: boolean;
  sliderFormatter?: (v: number | null) => string;
  children?: JSX.Element;
  splitPercent?: number;
}

export default function Input(props: InputProps) {
  const inputElement = props.slider ? (
    <Slider
      value={parseInt(`${props.value}`)}
      setValue={props.updateValue}
      format={props.sliderFormatter || defaultFormatter}
    />
  ) : (
    <input
      value={props.value || ""}
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
