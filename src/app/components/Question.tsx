import SideBySide from "./SideBySide";
import styles from "./styles.module.css";

interface QuestionProps {
  children: JSX.Element | JSX.Element[];
  splitPercent?: number;
  label: string;
  optional?: boolean;
  error?: string | false;
  stackVertically?: boolean;
}

export default function Question(props: QuestionProps) {
  return (
    <div className={styles.inputAndError}>
      <div className={styles.label}>
        {props.label}
        {props.optional ? "" : "*"}
      </div>
      {Array.isArray(props.children) ? (
        <SideBySide
          splitPercent={props.splitPercent}
          stackVertically={props.stackVertically}
        >
          {props.children[0]}
          {props.children[1]}
        </SideBySide>
      ) : (
        props.children
      )}
      {props.error && <div className={styles.errorText}>{props.error}</div>}
    </div>
  );
}
