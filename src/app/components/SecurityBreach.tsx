import { SignupStageProps } from "../interfaces";
import Button from "./Button";
import styles from "./styles.module.css";

export default function SecurityBreach(props: SignupStageProps) {
  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>Your account has been compromised</h1>
        Here at Cursed, we take privacy very seriously. Unfortunately, we
        willingly decided to sell most of your data to third-party companies.
        Your remaining data was also compromised in a security breach due to
        exposed passwords. To prevent your data from being further compromised,
        we wiped our user database.
        <br />
        <br />
        If you would like to file a complaint, please create an account.
      </div>
      <div className={styles.formContainer}>
        <Button
          text="Create an account"
          enabled={true}
          onClick={props.goToNextStage}
        />
        <div>
          Developed by{" "}
          <a href="https://marcos.ac" target="_blank">
            Marcos Acosta
          </a>
          .
        </div>
      </div>
    </div>
  );
}
