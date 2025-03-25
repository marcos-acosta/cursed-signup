"use client";

import { useState } from "react";
import Layout from "./components/Layout";
import BasicInfo from "./components/BasicInfo";
import ConfirmPassword from "./components/ConfirmPassword";
import AboutYou from "./components/AboutYou";

const enum SignupStage {
  BASIC_INFO = 1,
  CONFIRM_PASSWORD = 2,
  ABOUT_YOU = 3,
}

const STARTING_PAGE =
  process.env.NODE_ENV === "development"
    ? SignupStage.ABOUT_YOU
    : SignupStage.BASIC_INFO;

export default function Home() {
  const [signupStage, setSignupStage] = useState(STARTING_PAGE);
  const [password, setPassword] = useState("");

  const nextSignupStage = () => {
    setSignupStage(signupStage + 1);
  };

  const stageComponent =
    signupStage === SignupStage.BASIC_INFO ? (
      <BasicInfo goToNextStage={nextSignupStage} setPassword={setPassword} />
    ) : signupStage === SignupStage.CONFIRM_PASSWORD ? (
      <ConfirmPassword goToNextStage={nextSignupStage} password={password} />
    ) : signupStage === SignupStage.ABOUT_YOU ? (
      <AboutYou goToNextStage={nextSignupStage} />
    ) : (
      <></>
    );

  return <Layout>{stageComponent}</Layout>;
}
