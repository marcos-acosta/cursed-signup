import React from "react";
import styles from "./styles.module.css";

interface DropdownProps {
  options: string[];
  value: string | null;
  setValue: (s: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  return (
    <div className={styles.dropdownContainer}>
      <select
        className={styles.dropdown}
        onChange={(e) => props.setValue(e.target.value)}
        value={props.value || "initial"}
      >
        <option disabled value="initial">
          (select unit)
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
