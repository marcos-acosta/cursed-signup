import React from "react";
import styles from "./styles.module.css";
import { combineClasses } from "../util";
import { MONO_FONT, SANS_FONT } from "../fonts";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <div
          className={combineClasses(styles.companyName, MONO_FONT.className)}
        >
          <span className={styles.inverted}>Cursed</span> Solutions
        </div>
      </div>
      <div
        className={combineClasses(
          styles.bodyOuterContainer,
          SANS_FONT.className
        )}
      >
        <div className={styles.bodyInnerContainer}>{props.children}</div>
      </div>
    </div>
  );
}
