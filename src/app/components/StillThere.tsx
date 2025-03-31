import { useEffect, useState } from "react";
import Button from "./Button";
import styles from "./styles.module.css";

interface StillThereProps {
  reset: () => void;
  continue: () => void;
}

export default function StillThere(props: StillThereProps) {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const timeoutId = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    if (secondsLeft < 0) {
      props.reset();
    }
    return () => clearTimeout(timeoutId);
  }, [secondsLeft]);

  return (
    <div className={styles.stillThereScreen}>
      <div className={styles.stillThereTextContainer}>
        <div className={styles.stillThereTitle}>
          <h1>Still there?</h1>
        </div>
        <div className={styles.stillThereText}>
          Due to inactivity, your session will be restarted in{" "}
          {Math.max(secondsLeft, 0)} seconds.
        </div>
        <div className={styles.stillHereButtonContainer}>
          <Button
            text="I'm still here"
            onClick={props.continue}
            enabled={true}
            autofocus={true}
          />
        </div>
      </div>
    </div>
  );
}
