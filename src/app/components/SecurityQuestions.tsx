import { useState } from "react";
import { SignupStageProps } from "../interfaces";
import Dropdown from "./Dropdown";
import styles from "./styles.module.css";
import Question from "./Question";
import Input from "./Input";
import Button from "./Button";
import { doesTimeMatchCurrentTime, isValidInt, isValidTime } from "../util";

interface SecurityQuestionsProps extends SignupStageProps {
  password: string;
}

const PASSWORD_QUESTION = "What is your password?";
const TIME_QUESTION = "What time is it right now?";
const FRIENDS_QUESTION = "How many friends do you have?";

const SECURITY_QUESTIONS = [
  TIME_QUESTION,
  "Who was the first female U.S. Senator?",
  PASSWORD_QUESTION,
  "When will you tell them the truth?",
  "What was the model of your first private jet?",
  "What is something you constantly forget?",
  "What is the first letter on your keyboard?",
  FRIENDS_QUESTION,
  "What is the name of your favorite armadillo?",
];

export default function SecurityQuestions(props: SecurityQuestionsProps) {
  const [question1, setQuestion1] = useState(null as string | null);
  const [answer1, setAnswer1] = useState("");
  const [question2, setQuestion2] = useState(null as string | null);
  const [answer2, setAnswer2] = useState("");
  const [question3, setQuestion3] = useState(null as string | null);
  const [answer3, setAnswer3] = useState("");

  const checkPasswordOrUndefined = (question: string, answer: string) => {
    return question === PASSWORD_QUESTION && answer !== props.password
      ? "Passwords do not match"
      : undefined;
  };

  const checkTimeFormat = (question: string, answer: string) => {
    return question === TIME_QUESTION
      ? !isValidTime(answer)
        ? "Not a valid time"
        : !doesTimeMatchCurrentTime(answer)
        ? "Time does not match"
        : undefined
      : undefined;
  };

  const checkIntFormat = (question: string, answer: string) => {
    return question === FRIENDS_QUESTION
      ? !isValidInt(answer)
        ? "Must be a number"
        : parseInt(answer) > 100
        ? "That seems unlikely"
        : undefined
      : undefined;
  };

  const checkAnswer = (question: string | null, answer: string) => {
    return question && answer.length > 0
      ? checkPasswordOrUndefined(question, answer) ||
          checkTimeFormat(question, answer) ||
          checkIntFormat(question, answer)
      : undefined;
  };

  const question1Error =
    answer1.length > 0 && question1 === null
      ? "You must select a question to answer"
      : checkAnswer(question1, answer1);

  const question2Error =
    answer2.length > 0 && question2 === null
      ? "You must select a question to answer"
      : question1 === question2 && question2 !== null
      ? "Must choose different questions"
      : checkAnswer(question2, answer2);

  const question3Error =
    answer3.length > 0 && question3 === null
      ? "You must select a question to answer"
      : (question1 === question3 || question2 === question3) &&
        question3 !== null
      ? "Must choose different questions"
      : checkAnswer(question3, answer3);

  const question1IsValid = Boolean(question1) && answer1.length > 0;
  const question2IsValid =
    Boolean(question2) && answer2.length > 0 && !question2Error;
  const question3IsValid =
    Boolean(question3) && answer3.length > 0 && !question3Error;

  const canMoveOn = question1IsValid && question2IsValid && question3IsValid;

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>Almost there...</h1>
        To keep your account secure, please answer three security questions.
      </div>
      <div className={styles.formContainer}>
        <Question
          label="Security question 1"
          stackVertically={true}
          error={question1Error}
        >
          <Dropdown
            options={SECURITY_QUESTIONS}
            value={question1}
            setValue={setQuestion1}
            placeholder="(Select question #1)"
          />
          <Input
            value={answer1}
            updateValue={setAnswer1}
            placeholder="Answer #1"
            error={Boolean(question1Error)}
            type={question1 === PASSWORD_QUESTION ? "password" : undefined}
          />
        </Question>
        <Question
          label="Security question 2"
          stackVertically={true}
          error={question2Error}
        >
          <Dropdown
            options={SECURITY_QUESTIONS}
            value={question2}
            setValue={setQuestion2}
            placeholder="(Select question #2)"
          />
          <Input
            value={answer2}
            updateValue={setAnswer2}
            placeholder="Answer #2"
            error={Boolean(question2Error)}
            type={question2 === PASSWORD_QUESTION ? "password" : undefined}
          />
        </Question>
        <Question
          label="Security question 3"
          stackVertically={true}
          error={question3Error}
        >
          <Dropdown
            options={SECURITY_QUESTIONS}
            value={question3}
            setValue={setQuestion3}
            placeholder="(Select question #3)"
          />
          <Input
            value={answer3}
            updateValue={setAnswer3}
            placeholder="Answer #3"
            error={Boolean(question3Error)}
            type={question3 === PASSWORD_QUESTION ? "password" : undefined}
          />
        </Question>
        <Button
          text={"Create account"}
          enabled={canMoveOn}
          onClick={props.goToNextStage}
        />
      </div>
    </div>
  );
}
