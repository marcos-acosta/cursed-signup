import { useState } from "react";
import { SignupStageProps } from "../interfaces";
import Button from "./Button";
import styles from "./styles.module.css";
import { combineClasses, phoneNumberFormatter } from "../util";
import { MONO_FONT } from "../fonts";

interface ConfirmNumberProps extends SignupStageProps {
  phoneNumber: string;
}

const MILLIS_PER_UPDATE = 10;

const MIN_AREA_CODE = 0;
const MAX_AREA_CODE = 999;
const MIN_REST_OF_NUMBER = 0;
const MAX_REST_OF_NUMBER = 9999999;

export default function ConfirmNumber(props: ConfirmNumberProps) {
  const [paused, setPaused] = useState(true);
  const [areaCode, setAreaCode] = useState(null as null | number);
  const [restOfNumber, setRestOfNumber] = useState(null as null | number);
  const [intervalId, setIntervalId] = useState(
    null as null | ReturnType<typeof setInterval>
  );

  const trueNumberString = `${props.phoneNumber}`.padStart(10, "0");
  const paddedAreaCode = `${areaCode}`.padStart(3, "0");
  const paddedRestOfNumber = `${restOfNumber}`.padStart(7, "0");

  const acceptableDiff =
    paused && areaCode
      ? Math.abs(areaCode - parseInt(trueNumberString.slice(0, 3))) <= 5
      : undefined;

  const incrementNumber = () => {
    setAreaCode((prevNumber) =>
      Math.min((prevNumber || MIN_AREA_CODE) + 1, MAX_AREA_CODE)
    );
    setRestOfNumber(Math.floor(Math.random() * MAX_REST_OF_NUMBER));
  };

  const combinedNumber = `${paddedAreaCode}${paddedRestOfNumber}`;

  const clickButton = () => {
    if (paused) {
      setPaused(false);
      setAreaCode(MIN_AREA_CODE);
      setRestOfNumber(MIN_REST_OF_NUMBER);
      const id = setInterval(incrementNumber, MILLIS_PER_UPDATE);
      setIntervalId(id);
    } else {
      setPaused(true);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>Confirm your phone number</h1>
        Press the button labeled &quot;Start&quot; and press it again to stop as
        soon as you see your number appear.
      </div>
      <div className={styles.formContainer}>
        <div
          className={combineClasses(
            styles.phoneNumberDisplay,
            MONO_FONT.className
          )}
        >
          {phoneNumberFormatter(parseInt(combinedNumber))}
        </div>
        <Button
          onClick={clickButton}
          enabled={acceptableDiff === undefined || !acceptableDiff}
          text={paused ? (areaCode === null ? "Start" : "Try again") : "Stop"}
        />
        {acceptableDiff !== undefined && paused && (
          <div
            className={combineClasses(
              styles.resultPanel,
              !acceptableDiff && styles.notCloseEnough
            )}
          >
            {acceptableDiff
              ? "Phone number area codes are close enough."
              : "Phone numbers are not close enough."}
          </div>
        )}
        {acceptableDiff && (
          <Button
            onClick={props.goToNextStage}
            enabled={true}
            text="Create account"
          />
        )}
      </div>
    </div>
  );
}
