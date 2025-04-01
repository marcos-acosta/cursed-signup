import { combineClasses } from "../util";
import styles from "./styles.module.css";

interface CaptchaPartitionProps {
  imagePath: string;
  selected: boolean;
  select: () => void;
  password?: string;
  isHollow?: boolean;
}

export default function CaptchaPartition(props: CaptchaPartitionProps) {
  const maybeSelectedCheck = props.selected && (
    <div
      className={combineClasses(
        styles.checkbox,
        props.isHollow && styles.webcamCheckbox
      )}
    >
      <span
        className={combineClasses(
          "material-symbols-outlined",
          styles.checkIcon
        )}
      >
        check
      </span>
    </div>
  );

  return props.isHollow ? (
    <div
      className={combineClasses(
        styles.hollowClickablePartition,
        props.selected && styles.selected
      )}
      onClick={props.select}
      role="button"
    >
      {maybeSelectedCheck}
    </div>
  ) : (
    <div
      className={styles.clickablePartition}
      onClick={props.select}
      role="button"
    >
      <div
        className={combineClasses(
          styles.imagePartitionContainer,
          props.selected && styles.selected
        )}
      >
        {maybeSelectedCheck}
        {props.password ? (
          <div className={styles.passwordContainer}>
            <div className={styles.passwordInnerContainer}>
              {props.password}
            </div>
          </div>
        ) : (
          <img src={props.imagePath} className={styles.imagePartition} alt="" />
        )}
      </div>
    </div>
  );
}
