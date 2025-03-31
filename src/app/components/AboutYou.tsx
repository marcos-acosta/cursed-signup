import React, { useState } from "react";
import Input from "./Input";
import styles from "./styles.module.css";
import Button from "./Button";
import { isValidMbti, isValidNumber, phoneNumberFormatter } from "../util";
import Dropdown from "./Dropdown";
import { SignupStageProps } from "../interfaces";
import Question from "./Question";
import Slider from "./Slider";
import { HexColorPicker } from "react-colorful";
import ColorSwatch from "./ColorSwatch";

interface AboutYouProps extends SignupStageProps {
  password: string;
}

export default function AboutYou(props: AboutYouProps) {
  const [eyeColor, setEyeColor] = useState("#332211");
  const [mbti, setMbti] = useState("");
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState(null as null | string);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null as number | null);

  const validMbti = isValidMbti(mbti);
  const validHeight = height.length > 0 && isValidNumber(height);
  const validConfirmPassword = confirmPassword === props.password;
  const validUnit = Boolean(unit);
  const validPhoneNumber = Boolean(phoneNumber);

  const showMbtiError = mbti.length > 0 && !validMbti;
  const showHeightError = height.length > 0 && !validHeight;
  const showConfirmPasswordError =
    confirmPassword.length > 0 && !validConfirmPassword;

  const canShowConfirmPassword =
    validMbti && validHeight && validUnit && validPhoneNumber;

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
        <Question label="Eye color" splitPercent={70}>
          <HexColorPicker
            color={eyeColor}
            onChange={setEyeColor}
            style={{
              height: "150px",
              width: "100%",
            }}
          />
          <ColorSwatch color={eyeColor} />
        </Question>
        <Question
          label="Myers-Briggs Type Indicator"
          error={showMbtiError && "Must be a valid MBTI"}
        >
          <Input
            value={mbti}
            updateValue={setMbti}
            error={showMbtiError}
            placeholder="e.g. ENFJ"
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
            placeholder="(Select unit)"
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
              type="password"
            />
          </Question>
        )}
        <Button text={"Create account"} enabled={canMoveOn} onClick={moveOn} />
      </div>
    </div>
  );
}
