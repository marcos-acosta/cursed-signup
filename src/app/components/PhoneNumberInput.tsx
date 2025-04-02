import { useState } from "react";
import Dropdown from "./Dropdown";
import styles from "./styles.module.css";
import { SignupStageProps } from "../interfaces";
import Button from "./Button";
import Question from "./Question";
import Input from "./Input";

interface PhoneNumberInputProps extends SignupStageProps {
  setPhoneNumber: (s: string) => void;
}

const DIGITS = [...Array(10).keys()].map((n) => `${n}`);

export default function PhoneNumberInput(props: PhoneNumberInputProps) {
  /**
   * Yes, I know there's a cleaner way to do this, but in the spirit of Cursed, let's do it the ugly way.
   */
  const [firstDigit, setFirstDigit] = useState(null as string | null);
  const [secondDigit, setSecondDigit] = useState(null as string | null);
  const [thirdDigit, setThirdDigit] = useState(null as string | null);
  const [fourthDigit, setFourthDigit] = useState(null as string | null);
  const [fifthDigit, setFifthDigit] = useState(null as string | null);
  const [sixthDigit, setSixthDigit] = useState(null as string | null);
  const [seventhDigit, setSeventhDigit] = useState(null as string | null);
  const [eighthDigit, setEighthDigit] = useState(null as string | null);
  const [ninthDigit, setNinthDigit] = useState(null as string | null);
  const [tenthDigit, setTenthDigit] = useState(null as string | null);
  const [confirmNumber, setConfirmNumber] = useState("");
  const hasValidNumber = Boolean(
    firstDigit &&
      secondDigit &&
      thirdDigit &&
      fourthDigit &&
      fifthDigit &&
      sixthDigit &&
      seventhDigit &&
      eighthDigit &&
      ninthDigit &&
      tenthDigit
  );
  const combinedNumber = hasValidNumber
    ? `${firstDigit}${secondDigit}${thirdDigit}${fourthDigit}${fifthDigit}${sixthDigit}${seventhDigit}${eighthDigit}${ninthDigit}${tenthDigit}`
    : null;
  const validConfirmNumber = combinedNumber && combinedNumber === confirmNumber;
  const showConfirmNumberError =
    confirmNumber.length > 0 && !validConfirmNumber;

  const moveOn = () => {
    if (combinedNumber) {
      props.setPhoneNumber(combinedNumber);
      props.goToNextStage();
    }
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>Last step</h1>
        Your phone number is required to verify your identity.
      </div>
      <div className={styles.formContainer}>
        <Question label="First digit">
          <Dropdown
            options={DIGITS.slice(1)}
            value={firstDigit}
            setValue={setFirstDigit}
            placeholder="(Select digit)"
          />
        </Question>
        <Question label="Second digit">
          <Dropdown
            options={DIGITS}
            value={secondDigit}
            setValue={setSecondDigit}
            placeholder="(Select digit)"
          />
        </Question>
        <Question label="Third digit">
          <Dropdown
            options={DIGITS}
            value={thirdDigit}
            setValue={setThirdDigit}
            placeholder="(Select digit)"
          />
        </Question>
        <Question label="Fourth digit">
          <Dropdown
            options={DIGITS}
            value={fourthDigit}
            setValue={setFourthDigit}
            placeholder="(Select digit)"
          />
        </Question>
        <Question label="Fifth digit">
          <Dropdown
            options={DIGITS}
            value={fifthDigit}
            setValue={setFifthDigit}
            placeholder="(Select digit)"
          />
        </Question>
        <Question label="Sixth digit">
          <Dropdown
            options={DIGITS}
            value={sixthDigit}
            setValue={setSixthDigit}
            placeholder="(Select digit)"
          />
        </Question>
        <Question label="Seventh digit">
          <Dropdown
            options={DIGITS}
            value={seventhDigit}
            setValue={setSeventhDigit}
            placeholder="(Select digit)"
          />
        </Question>
        <Question label="Eighth digit">
          <Dropdown
            options={DIGITS}
            value={eighthDigit}
            setValue={setEighthDigit}
            placeholder="(Select digit)"
          />
        </Question>
        <Question label="Ninth digit">
          <Dropdown
            options={DIGITS}
            value={ninthDigit}
            setValue={setNinthDigit}
            placeholder="(Select digit)"
          />
        </Question>
        <Question label="Tenth digit">
          <Dropdown
            options={DIGITS}
            value={tenthDigit}
            setValue={setTenthDigit}
            placeholder="(Select digit)"
          />
        </Question>
        {hasValidNumber && (
          <Question
            label="Confirm phone number"
            error={showConfirmNumberError && "Phone numbers do not match"}
          >
            <Input
              value={confirmNumber}
              updateValue={setConfirmNumber}
              error={showConfirmNumberError}
              type="tel"
            />
          </Question>
        )}
        <Button
          text={"Create account"}
          enabled={Boolean(validConfirmNumber)}
          onClick={moveOn}
        />
      </div>
    </div>
  );
}
