import React, { useState } from "react";
import Input from "./Input";
import styles from "./styles.module.css";
import Button from "./Button";
import { isValidHex, isValidMbti } from "../util";
import SideBySide from "./SideBySide";
import ColorSwatch from "./ColorSwatch";

interface AboutYouProps extends SignupStageProps {}

export default function AboutYou(props: AboutYouProps) {
  const [hairColor, setHairColor] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [mbti, setMbti] = useState("");

  const validHairColor = isValidHex(hairColor);
  const validEyeColor = isValidHex(eyeColor);
  const validMbti = isValidMbti(mbti);

  const showHairColorError = hairColor.length > 0 && !validHairColor;
  const showEyeColorError = eyeColor.length > 0 && !validEyeColor;
  const showMbtiError = mbti.length > 0 && !validMbti;

  const canMoveOn = Boolean(validEyeColor && validHairColor);

  const moveOn = () => {
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
        <Button text={"Create account"} enabled={canMoveOn} onClick={moveOn} />
      </div>
    </div>
  );
}
