import { useEffect, useRef, useState } from "react";
import { SignupStageProps } from "../interfaces";
import Captcha from "./Captcha";
import styles from "./styles.module.css";
import Button from "./Button";

interface CaptchaStageProps extends SignupStageProps {
  password: string;
}

interface CaptchaImage {
  object: string;
  pathName: string;
}

export const PASSWORD_PATHNAME = "password";
const RICKROLL_PATHNAME = "rick";
const CHESS_PATHNAME = "chess";
const SELF_PATHNAME = "self";

const CUTIE_OR_LOSER = Math.random() > 0.5 ? "cuties" : "losers";

const CAPTCHAS: CaptchaImage[] = [
  { object: "traffic lights", pathName: "traffic-light" },
  { object: "sandwiches", pathName: "hot-dog" },
  { object: "pipes", pathName: "pipe" },
  { object: "Waldo", pathName: "waldo" },
  { object: "pieces involved in checkmate", pathName: CHESS_PATHNAME },
  { object: "your password", pathName: PASSWORD_PATHNAME },
  { object: CUTIE_OR_LOSER, pathName: SELF_PATHNAME },
  { object: "English pop singers", pathName: RICKROLL_PATHNAME },
];

const getAllPaths = (prefix: string, numPartitions: number) => {
  const partitions = [] as string[];
  for (let i = 1; i <= numPartitions; i++) {
    for (let j = 1; j <= numPartitions; j++) {
      partitions.push(`/images/${prefix}/partition-${i}-${j}.png`);
    }
  }
  return partitions;
};

export default function CaptchaStage(props: CaptchaStageProps) {
  const [beganCaptcha, setBeganCaptcha] = useState(false);
  const [captchaIndex, setCaptchaIndex] = useState(0);
  const audioRef = useRef(null as null | HTMLAudioElement);

  const captchaImage = CAPTCHAS[captchaIndex];
  const useWebcam = captchaImage.pathName === SELF_PATHNAME;

  useEffect(() => {
    if (audioRef.current) {
      if (captchaImage.pathName === RICKROLL_PATHNAME) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [captchaImage]);

  useEffect(() => {
    setTimeout(preloadNextBatch, 1000);
  }, [beganCaptcha, captchaIndex]);

  const preloadNextBatch = () => {
    const nextIndexToLoad = beganCaptcha ? captchaIndex + 1 : 0;
    if (nextIndexToLoad < CAPTCHAS.length) {
      const nextCaptcha = CAPTCHAS[nextIndexToLoad];
      // Won't be able to pre-fetch images for the webcam stage.
      if (nextCaptcha.pathName === SELF_PATHNAME) {
        return;
      }
      const numPartitions = nextCaptcha.pathName === CHESS_PATHNAME ? 8 : 4;
      const nextImagePaths = getAllPaths(nextCaptcha.pathName, numPartitions);
      nextImagePaths.forEach((path) => {
        const img = new Image();
        img.src = path;
        img.alt = "";
      });
    }
  };

  const nextCaptcha = () => {
    if (captchaIndex === CAPTCHAS.length - 1) {
      props.goToNextStage();
    } else {
      setCaptchaIndex(captchaIndex + 1);
    }
  };

  return (
    <div>
      <div className={styles.titleContainer}>
        <h1>Hey there, human</h1>
        To finalize your account, we need to make sure you&apos;re not a bot.
        Press the button below to verify your identity via CAPTCHA.
      </div>
      <div className={styles.formContainer}>
        <Button
          text="I'm not a bot"
          enabled={true}
          onClick={() => setBeganCaptcha(true)}
        />
      </div>
      {beganCaptcha && (
        <Captcha
          password={props.password}
          imagePath={captchaImage.pathName}
          identificationObject={captchaImage.object}
          nextCaptcha={nextCaptcha}
          numPartitions={captchaImage.pathName === CHESS_PATHNAME ? 8 : 4}
          useWebcam={useWebcam}
        />
      )}
      <audio src="/rick-roll.mp3" ref={audioRef} />
    </div>
  );
}
