import React, { useState } from "react";
import Input from "./Input";
import styles from "./styles.module.css";
import Button from "./Button";
import { isValidEmail } from "../util";

interface BasicInfoProps extends SignupStageProps {
  setPassword: (s: string) => void;
}

export default function BasicInfo(props: BasicInfoProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validEmail = isValidEmail(email);
  const validPassword = password.length > 6;
  const validConfirmPassword = confirmPassword === password;

  const showEmailError = email.length > 0 && !validEmail;
  const showPasswordError = password.length > 0 && !validPassword;
  const showConfirmPasswordError =
    confirmPassword.length > 0 && !validConfirmPassword;

  const canMoveOn = Boolean(
    firstName.length &&
      lastName.length &&
      validEmail &&
      validPassword &&
      validConfirmPassword
  );

  const moveOn = () => {
    props.setPassword(password);
    props.goToNextStage();
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>Create an account</h1>
        Nothing you type here gets sent to a server. This signup page exists
        solely for your amusement.
      </div>
      <div className={styles.formContainer}>
        <Input
          value={firstName}
          updateValue={setFirstName}
          placeholder="First name"
        />
        <Input
          value={lastName}
          updateValue={setLastName}
          placeholder="Last name"
        />
        <Input
          value={email}
          updateValue={setEmail}
          placeholder="Email"
          error={showEmailError && "Must be a valid email address"}
        />
        <Input
          value={password}
          updateValue={setPassword}
          placeholder="Password"
          error={showPasswordError && "Must be >6 characters"}
          password={true}
        />
        {validPassword && (
          <Input
            value={confirmPassword}
            updateValue={setConfirmPassword}
            placeholder="Confirm password"
            error={showConfirmPasswordError && "Passwords do not match"}
            password={true}
          />
        )}
        <Button text={"Create account"} enabled={canMoveOn} onClick={moveOn} />
      </div>
    </div>
  );
}
