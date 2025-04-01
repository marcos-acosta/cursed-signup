import React from "react";
import styles from "./styles.module.css";
import { combineClasses } from "../util";

interface DropdownProps {
  options: string[];
  value: string | null;
  setValue: (s: string) => void;
  placeholder?: string;
}

export default function Dropdown(props: DropdownProps) {
  return (
    <div className={styles.dropdownContainer}>
      <select
        className={combineClasses(
          styles.dropdown,
          props.value === null && styles.defaultDropdownOption
        )}
        onChange={(e) => props.setValue(e.target.value)}
        value={props.value || "initial"}
      >
        <option disabled value="initial">
          {props.placeholder || "(Select value)"}
        </option>
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
