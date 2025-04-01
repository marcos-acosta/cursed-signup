"use client";

import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import BasicInfo from "./components/BasicInfo";
import ConfirmPassword from "./components/ConfirmPassword";
import AboutYou from "./components/AboutYou";
import SecurityQuestions from "./components/SecurityQuestions";
import CaptchaStage from "./components/CaptchaStage";
import StillThere from "./components/StillThere";
import SignedOut from "./components/SignedOut";
import PhoneNumberInput from "./components/PhoneNumberInput";
import ConfirmNumber from "./components/ConfirmNumber";
import AccountCreated from "./components/AccountCreated";
import SecurityBreach from "./components/SecurityBreach";

const enum SignupStage {
  BASIC_INFO = 1,
  CONFIRM_PASSWORD = 2,
  ABOUT_YOU = 3,
  SECURITY_QUESTIONS = 4,
  CAPTCHA = 5,
  PHONE_NUMBER_INPUT = 6,
  CONFIRM_PHONE_NUMBER = 7,
  ACCOUNT_CREATED = 8,
  SECURITY_BREACHED = 9,
}

const DEV_STARTING_STAGE = SignupStage.BASIC_INFO;
const DEV_PASSWORD = "password123";
const DEV_PHONE_NUMBER = "5000000000";

const PROD_STARTING_STAGE = SignupStage.BASIC_INFO;
const PROD_INITIAL_PASSWORD = "";
const PROD_PHONE_NUMBER = "0000000000";

const STARTING_PAGE =
  process.env.NODE_ENV === "development"
    ? DEV_STARTING_STAGE
    : PROD_STARTING_STAGE;

const INITIAL_PASSWORD =
  STARTING_PAGE === PROD_STARTING_STAGE ? PROD_INITIAL_PASSWORD : DEV_PASSWORD;

const INITIAL_PHONE_NUMBER =
  STARTING_PAGE === PROD_STARTING_STAGE ? PROD_PHONE_NUMBER : DEV_PHONE_NUMBER;

const MIN_SECONDS_BETWEEN_STILL_THERES = 20;
const RANDOM_SECONDS = 15;

export default function Home() {
  const [signupStage, setSignupStage] = useState(STARTING_PAGE);
  const [password, setPassword] = useState(INITIAL_PASSWORD);
  const [phoneNumber, setPhoneNumber] = useState(INITIAL_PHONE_NUMBER);
  const [showingStillThere, setShowingStillThere] = useState(false);
  const [timeoutId, setTimeoutId] = useState(
    null as null | ReturnType<typeof setTimeout>
  );
  const [showSignedOut, setShowSignedOut] = useState(false);

  const showStillThere = () => setShowingStillThere(true);
  const clearCurrentTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
  };

  const restartTimoutForStillThere = () => {
    const numSecondsToWait = Math.floor(Math.random() * RANDOM_SECONDS);
    clearCurrentTimeout();
    const timeout = setTimeout(
      showStillThere,
      (MIN_SECONDS_BETWEEN_STILL_THERES + numSecondsToWait) * 1000
    );
    setTimeoutId(timeout);
  };

  useEffect(() => {
    if (signupStage === SignupStage.CONFIRM_PASSWORD) {
      restartTimoutForStillThere();
    }
  }, [signupStage]);

  const nextSignupStage = () => {
    setSignupStage(signupStage + 1);
  };

  const reset = () => {
    setSignupStage(PROD_STARTING_STAGE);
    setPassword(PROD_INITIAL_PASSWORD);
    setPhoneNumber(PROD_PHONE_NUMBER);
    setShowingStillThere(false);
    clearCurrentTimeout();
  };

  const logOutFromInactivity = () => {
    reset();
    setShowSignedOut(true);
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
    ) : signupStage === SignupStage.PHONE_NUMBER_INPUT ? (
      <PhoneNumberInput
        goToNextStage={nextSignupStage}
        setPhoneNumber={setPhoneNumber}
      />
    ) : signupStage === SignupStage.CONFIRM_PHONE_NUMBER ? (
      <ConfirmNumber
        goToNextStage={nextSignupStage}
        phoneNumber={phoneNumber}
      />
    ) : signupStage === SignupStage.ACCOUNT_CREATED ? (
      <AccountCreated goToNextStage={nextSignupStage} startOver={reset} />
    ) : signupStage === SignupStage.SECURITY_BREACHED ? (
      <SecurityBreach goToNextStage={reset} />
    ) : (
      <></>
    );

  const continueFn = () => {
    setShowingStillThere(false);
    restartTimoutForStillThere();
  };

  return (
    <>
      <Layout>{stageComponent}</Layout>
      {showingStillThere && (
        <StillThere continue={continueFn} reset={logOutFromInactivity} />
      )}
      {showSignedOut && <SignedOut close={() => setShowSignedOut(false)} />}
    </>
  );
}
