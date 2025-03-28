import React, { useState } from "react";
import Input from "./Input";
import styles from "./styles.module.css";
import Button from "./Button";
import {
  isValidHex,
  isValidMbti,
  isValidNumber,
  phoneNumberFormatter,
} from "../util";
import ColorSwatch from "./ColorSwatch";
import Dropdown from "./Dropdown";
import { SignupStageProps } from "../interfaces";
import Question from "./Question";
import Slider from "./Slider";

interface AboutYouProps extends SignupStageProps {
  password: string;
}

export default function AboutYou(props: AboutYouProps) {
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [mbti, setMbti] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState(null as null | string);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null as number | null);

  const validHairColor = isValidHex(hairColor);
  const validEyeColor = isValidHex(eyeColor);
  const validMbti = isValidMbti(mbti);
  const validHeight = height.length > 0 && isValidNumber(height);
  const validConfirmPassword = confirmPassword === props.password;
  const validUnit = Boolean(unit);
  const validPhoneNumber = Boolean(phoneNumber);

  const showHairColorError = hairColor.length > 0 && !validHairColor;
  const showEyeColorError = eyeColor.length > 0 && !validEyeColor;
  const showMbtiError = mbti.length > 0 && !validMbti;
  const showHeightError = height.length > 0 && !validHeight;
  const showConfirmPasswordError =
    confirmPassword.length > 0 && !validConfirmPassword;

  const canShowConfirmPassword =
    validEyeColor &&
    validHairColor &&
    validMbti &&
    validHeight &&
    validUnit &&
    validPhoneNumber;

  const canMoveOn = canShowConfirmPassword && validConfirmPassword;

  const moveOn = () => {
    props.goToNextStage();
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>Just a few more questions</h1>
        Let&apos;s get to know you!
      </div>
      <div className={styles.formContainer}>
        <Question label="Phone number">
          <Slider
            value={phoneNumber}
            setValue={setPhoneNumber}
            format={phoneNumberFormatter}
            min={1000000000}
            max={9999999999}
          />
        </Question>
        <Question
          label="Hair color"
          splitPercent={70}
          error={showHairColorError && "Must be a valid hex color"}
        >
          <Input
            value={hairColor}
            updateValue={setHairColor}
            placeholder="#4a0f06"
            error={showHairColorError}
          />
          <ColorSwatch color={validHairColor && hairColor} />
        </Question>
        <Question
          label="Eye color"
          splitPercent={70}
          error={showEyeColorError && "Must be a valid hex color"}
        >
          <Input
            value={eyeColor}
            updateValue={setEyeColor}
            placeholder="#78d8f5"
            error={showEyeColorError}
          />
          <ColorSwatch color={validEyeColor && eyeColor} />
        </Question>
        <Question
          label="Myers-Briggs Type Indicator"
          error={showMbtiError && "Must be a valid MBTI"}
        >
          <Input
            value={mbti}
            updateValue={setMbti}
            error={showMbtiError}
            placeholder="ENFJ"
          />
        </Question>
        <Question
          label="Height"
          error={showHeightError && "Must be a valid number"}
          splitPercent={30}
        >
          <Input
            value={height}
            updateValue={setHeight}
            error={showHeightError}
            placeholder="72"
          />
          <Dropdown
            options={[
              "nautical miles",
              "yards",
              "Subway® Footlongs",
              "football fields",
              "cubits",
            ]}
            value={unit}
            setValue={setUnit}
          />
        </Question>
        {canShowConfirmPassword && (
          <Question
            label="Confirm password"
            error={showConfirmPasswordError && "Passwords do not match"}
          >
            <Input
              value={confirmPassword}
              updateValue={setConfirmPassword}
              error={showConfirmPasswordError}
              password={true}
            />
          </Question>
        )}
        <Button text={"Create account"} enabled={canMoveOn} onClick={moveOn} />
      </div>
    </div>
  );
}
