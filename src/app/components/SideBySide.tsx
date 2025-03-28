import React from "react";
import styles from "./styles.module.css";

export interface SideBySideProps {
  children: JSX.Element[];
  splitPercent?: number;
  stackVertically?: boolean;
}

export default function SideBySide(props: SideBySideProps) {
  const gridTemplateColumns = props.stackVertically
    ? undefined
    : `${props.splitPercent || "50"}% auto`;
  const gridTemplateRows = props.stackVertically ? "auto auto" : undefined;

  return (
    <div
      className={styles.sideBySideContainer}
      style={{
        gridTemplateColumns: gridTemplateColumns,
        gridTemplateRows: gridTemplateRows,
      }}
    >
      {props.children[0]}
      {props.children[1]}
    </div>
  );
}
