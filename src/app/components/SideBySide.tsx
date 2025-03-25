import React from "react";
import styles from "./styles.module.css";

export interface SideBySideProps {
  children: JSX.Element[];
  splitPercent?: number;
}

export default function SideBySide(props: SideBySideProps) {
  return (
    <div
      className={styles.sideBySideContainer}
      style={{ gridTemplateColumns: `${props.splitPercent || "50"}% 1fr` }}
    >
      {props.children[0]}
      {props.children[1]}
    </div>
  );
}
