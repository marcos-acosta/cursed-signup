import { combineClasses } from "../util";
import styles from "./styles.module.css";

interface CaptchaPartitionProps {
  imagePath: string;
  selected: boolean;
  select: () => void;
  password?: string;
}

export default function CaptchaPartition(props: CaptchaPartitionProps) {
  return (
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
        {props.selected && (
          <div className={styles.checkbox}>
            <span
              className={combineClasses(
                "material-symbols-outlined",
                styles.checkIcon
              )}
            >
              check
            </span>
          </div>
        )}
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
