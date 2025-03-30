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

const CAPTCHAS: CaptchaImage[] = [
  { object: "traffic lights", pathName: "traffic-light" },
  { object: "sandwiches", pathName: "hot-dog" },
  { object: "pipes", pathName: "pipe" },
  { object: "Waldo", pathName: "waldo" },
  { object: "pieces involved in checkmate", pathName: "chess" },
  { object: "your password", pathName: "password" },
  { object: "Rick Astleys", pathName: "rick" },
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

  useEffect(() => {
    if (audioRef.current) {
      if (captchaImage.pathName === "rick") {
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
      const numPartitions = nextCaptcha.pathName === "chess" ? 8 : 4;
      const nextImagePaths = getAllPaths(nextCaptcha.pathName, numPartitions);
      nextImagePaths.forEach((path) => {
        console.log(`Preloading image ${path}`);
        const img = new Image();
        img.src = path;
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
          numPartitions={captchaImage.pathName === "chess" ? 8 : 4}
        />
      )}
      <audio src="/rick-roll.mp3" ref={audioRef} />
    </div>
  );
}
