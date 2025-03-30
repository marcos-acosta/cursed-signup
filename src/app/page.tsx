"use client";

import { useState } from "react";
import Layout from "./components/Layout";
import BasicInfo from "./components/BasicInfo";
import ConfirmPassword from "./components/ConfirmPassword";
import AboutYou from "./components/AboutYou";
import SecurityQuestions from "./components/SecurityQuestions";
import CaptchaStage from "./components/CaptchaStage";

const enum SignupStage {
  BASIC_INFO = 1,
  CONFIRM_PASSWORD = 2,
  ABOUT_YOU = 3,
  SECURITY_QUESTIONS = 4,
  CAPTCHA = 5,
}

const DEV_STARTING_STAGE = SignupStage.CAPTCHA;
const DEV_PASSWORD = "password123";

const STARTING_PAGE =
  process.env.NODE_ENV === "development"
    ? DEV_STARTING_STAGE
    : SignupStage.BASIC_INFO;

const INITIAL_PASSWORD =
  STARTING_PAGE === SignupStage.BASIC_INFO ? "" : DEV_PASSWORD;

export default function Home() {
  const [signupStage, setSignupStage] = useState(STARTING_PAGE);
  const [password, setPassword] = useState(INITIAL_PASSWORD);

  const nextSignupStage = () => {
    setSignupStage(signupStage + 1);
  };

  const stageComponent =
    signupStage === SignupStage.BASIC_INFO ? (
      <BasicInfo goToNextStage={nextSignupStage} setPassword={setPassword} />
    ) : signupStage === SignupStage.CONFIRM_PASSWORD ? (
      <ConfirmPassword goToNextStage={nextSignupStage} password={password} />
    ) : signupStage === SignupStage.ABOUT_YOU ? (
      <AboutYou goToNextStage={nextSignupStage} password={password} />
    ) : signupStage === SignupStage.SECURITY_QUESTIONS ? (
      <SecurityQuestions goToNextStage={nextSignupStage} password={password} />
    ) : signupStage === SignupStage.CAPTCHA ? (
      <CaptchaStage goToNextStage={nextSignupStage} password={password} />
    ) : (
      <></>
    );

  return <Layout>{stageComponent}</Layout>;
}
