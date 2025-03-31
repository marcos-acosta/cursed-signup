import { combineClasses } from "../util";
import styles from "./styles.module.css";

interface SignedOutProps {
  close: () => void;
}

export default function SignedOut(props: SignedOutProps) {
  return (
    <div className={styles.signedOutBanner}>
      <div className={styles.bannerGrid}>
        <div className={styles.bannerText}>
          You&apos;ve been logged out due to inactivity.
        </div>
        <div className={styles.closeButtonContainer}>
          <div
            className={styles.closeButton}
            role="button"
            onClick={props.close}
          >
            <span
              className={combineClasses(
                "material-symbols-outlined",
                styles.closeIcon
              )}
            >
              close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
