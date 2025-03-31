import React, { useState } from "react";
import Input from "./Input";
import styles from "./styles.module.css";
import Button from "./Button";
import { isValidEmail } from "../util";
import { SignupStageProps } from "../interfaces";
import Question from "./Question";
import { COMMON_FIRST_NAMES, COMMON_LAST_NAMES } from "../common-names";

interface BasicInfoProps extends SignupStageProps {
  setPassword: (s: string) => void;
}

export default function BasicInfo(props: BasicInfoProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validFirstName =
    firstName.length > 0 &&
    !COMMON_FIRST_NAMES.includes(firstName.toLowerCase());
  const validLastName =
    lastName.length > 0 && !COMMON_LAST_NAMES.includes(lastName.toLowerCase());
  const validEmail = isValidEmail(email);
  const validPassword = password.length > 6;
  const validConfirmPassword = confirmPassword === password;

  const showFirstNameError = firstName.length > 0 && !validFirstName;
  const showLastNameError = lastName.length > 0 && !validLastName;
  const showEmailError = email.length > 0 && !validEmail;
  const showPasswordError = password.length > 0 && !validPassword;
  const showConfirmPasswordError =
    confirmPassword.length > 0 && !validConfirmPassword;

  const canMoveOn = Boolean(
    validFirstName &&
      validLastName &&
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
        <Question
          label="First name"
          error={showFirstNameError && "That first name is taken"}
        >
          <Input
            value={firstName}
            updateValue={setFirstName}
            error={showFirstNameError}
            placeholder="First"
          />
        </Question>
        <Question
          label="Last name"
          error={showLastNameError && "That last name is taken"}
        >
          <Input
            value={lastName}
            updateValue={setLastName}
            error={showLastNameError}
            placeholder="Last"
          />
        </Question>
        <Question
          label="Email"
          error={showEmailError && "Must be a valid email address"}
        >
          <Input
            value={email}
            updateValue={setEmail}
            placeholder="first.last@example.com"
            error={showEmailError}
            type="email"
          />
        </Question>
        <Question
          label="Password"
          error={showPasswordError && "Must be >6 characters"}
        >
          <Input
            value={password}
            updateValue={setPassword}
            error={showPasswordError}
            type="password"
          />
        </Question>
        {validPassword && (
          <Question
            label="Confirm password"
            error={showConfirmPasswordError && "Passwords do not match"}
          >
            <Input
              value={confirmPassword}
              updateValue={setConfirmPassword}
              error={showConfirmPasswordError}
              type="password"
            />
          </Question>
        )}
        <Button text={"Create account"} enabled={canMoveOn} onClick={moveOn} />
      </div>
    </div>
  );
}
