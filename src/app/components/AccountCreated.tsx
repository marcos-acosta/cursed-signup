import { useEffect, useState } from "react";
import { SignupStageProps } from "../interfaces";
import Button from "./Button";
import styles from "./styles.module.css";

interface AccountCreatedProps extends SignupStageProps {
  startOver: () => void;
}

export default function AccountCreated(props: AccountCreatedProps) {
  const [moveButton, setMoveButton] = useState(false);

  const evil = () => setMoveButton(true);

  useEffect(() => {
    const id = setTimeout(evil, 2 * 1000);
    return () => clearTimeout(id);
  }, []);

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>Welcome to Cursed!</h1>
        Thank you for creating an account with Cursed,
        &#123;&#123;firstName&#125;&#125;! Press the button below to take you to
        your account.
      </div>
      <div className={styles.formContainer}>
        {moveButton && (
          <Button text="Start over" enabled={true} onClick={props.startOver} />
        )}
        <Button
          text="Take me to my account"
          enabled={true}
          onClick={props.goToNextStage}
        />
      </div>
    </div>
  );
}
