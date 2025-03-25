"use client";

import { useState } from "react";
import Layout from "./components/Layout";
import BasicInfo from "./components/BasicInfo";
import ConfirmPassword from "./components/ConfirmPassword";

const enum SignupStage {
  BASIC_INFO = 1,
  CONFIRM_PASSWORD = 2,
}

export default function Home() {
  const [signupStage, setSignupStage] = useState(SignupStage.BASIC_INFO);
  const [password, setPassword] = useState("");

  const nextSignupStage = () => {
    setSignupStage(signupStage + 1);
  };

  const stageComponent =
    signupStage === SignupStage.BASIC_INFO ? (
      <BasicInfo goToNextStage={nextSignupStage} setPassword={setPassword} />
    ) : signupStage === SignupStage.CONFIRM_PASSWORD ? (
      <ConfirmPassword goToNextStage={nextSignupStage} password={password} />
    ) : (
      <></>
    );

  return <Layout>{stageComponent}</Layout>;
}
