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
        <Input
          value={phoneNumber}
          updateValue={setPhoneNumber}
          label="Phone number"
          slider={true}
          sliderFormatter={phoneNumberFormatter}
        />
        <Input
          value={hairColor}
          updateValue={setHairColor}
          label="Hair color"
          placeholder="#4a0f06"
          error={showHairColorError && "Must be a valid hex color"}
          splitPercent={70}
        >
          <ColorSwatch color={validHairColor && hairColor} />
        </Input>
        <Input
          value={eyeColor}
          updateValue={setEyeColor}
          label="Eye color"
          placeholder="#78d8f5"
          error={showEyeColorError && "Must be a valid hex color"}
          splitPercent={70}
        >
          <ColorSwatch color={validEyeColor && eyeColor} />
        </Input>
        <Input
          value={mbti}
          updateValue={setMbti}
          label="Myers-Briggs Type Indicator"
          error={showMbtiError && "Must be a valid MBTI"}
          placeholder="ENFJ"
        />
        <Input
          value={height}
          updateValue={setHeight}
          label="Height"
          error={showHeightError && "Must be a valid number"}
          placeholder="0.001"
          splitPercent={30}
        >
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
        </Input>
        {canShowConfirmPassword && (
          <Input
            value={confirmPassword}
            updateValue={setConfirmPassword}
            label="Confirm password"
            error={showConfirmPasswordError && "Passwords do not match"}
            password={true}
          />
        )}
        <Button text={"Create account"} enabled={canMoveOn} onClick={moveOn} />
      </div>
    </div>
  );
}
