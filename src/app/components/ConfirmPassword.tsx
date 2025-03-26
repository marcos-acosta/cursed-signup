import React, { useState } from "react";
import Input from "./Input";
import styles from "./styles.module.css";
import Button from "./Button";
import { SignupStageProps } from "../interfaces";

interface ConfirmPasswordProps extends SignupStageProps {
  password: string;
}

export default function ConfirmPassword(props: ConfirmPasswordProps) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordAgain, setConfirmPasswordAgain] = useState("");
  const [confirmPasswordLastTime, setConfirmPasswordLastTime] = useState("");

  const validConfirmPassword = confirmPassword === props.password;
  const validConfirmPasswordAgain = confirmPasswordAgain === props.password;
  const validConfirmPasswordLastTime =
    confirmPasswordLastTime === props.password;

  const showConfirmPasswordError =
    confirmPassword.length > 0 && !validConfirmPassword;
  const showConfirmPasswordErrorAgain =
    confirmPasswordAgain.length > 0 && !validConfirmPasswordAgain;
  const showConfirmPasswordErrorLastTime =
    confirmPasswordLastTime.length > 0 && !validConfirmPasswordLastTime;

  const canMoveOn = Boolean(
    validConfirmPassword &&
      validConfirmPasswordAgain &&
      validConfirmPasswordLastTime
  );

  const moveOn = () => {
    props.goToNextStage();
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>Just to double check</h1>
        The security of your account is our top priority. Forgotten passwords
        are a common source of identity theft.
      </div>
      <div className={styles.formContainer}>
        <Input
          value={confirmPassword}
          updateValue={setConfirmPassword}
          label="Confirm password"
          error={showConfirmPasswordError && "Passwords do not match"}
          password={true}
        />
        {validConfirmPassword && (
          <>
            <Input
              value={confirmPasswordAgain}
              updateValue={setConfirmPasswordAgain}
              label="Confirm password again"
              error={showConfirmPasswordErrorAgain && "Passwords do not match"}
              password={true}
            />
            {validConfirmPasswordAgain && (
              <Input
                value={confirmPasswordLastTime}
                updateValue={setConfirmPasswordLastTime}
                label="Maximally confirm password"
                error={
                  showConfirmPasswordErrorLastTime && "Passwords do not match"
                }
                password={true}
              />
            )}
          </>
        )}
        <Button text={"Create account"} enabled={canMoveOn} onClick={moveOn} />
      </div>
    </div>
  );
}
