export const combineClasses = (
  ...classnames: (string | false | undefined | null)[]
) => classnames.filter(Boolean).join(" ");

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REHEX = /^#[0-9a-fA-F]{6}$/;
const MBTI_REGEX = /^[IE][SN][TF][JP]$/;
const NUMBER_REGEX = /^[0-9]*\.?[0-9]*$/;
const TIME_REGEX = /^((2[0-3])|([0-1]?[0-9]))(:[0-5][0-9])?\s?([pPaA][mM]?)?$/;
const INT_REGEX = /^\d+$/;

export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);
export const isValidHex = (hex: string) => REHEX.test(hex);
export const isValidMbti = (mbti: string) =>
  MBTI_REGEX.test(mbti.toUpperCase());
export const isValidNumber = (num: string) => NUMBER_REGEX.test(num);
export const isValidTime = (time: string) => TIME_REGEX.test(time);
export const isValidInt = (int: string) => INT_REGEX.test(int);

export const zipCodeFormatter = (n: number | null) =>
  n ? `${n}`.padStart(5, "0") : `_____`;
export const phoneNumberFormatter = (n: number | null) => {
  if (!n) {
    return "+1 (___) ___-____";
  } else {
    const numberString = `${n}`.padStart(10, "0");
    return `+1 (${numberString.slice(0, 3)}) ${numberString.slice(
      3,
      6
    )}-${numberString.slice(6)}`;
  }
};

export const getTimeAsDate = (time: string) => {
  if (!isValidTime(time)) {
    return undefined;
  }
  const hour = parseInt(time.split(":")[0]);
  const minutes = time.includes(":")
    ? parseInt(time.split(":")[1].slice(0, 2))
    : 0;
  const isPm = time.toLowerCase().includes("p");
  const hour24 = hour + (isPm ? 12 : 0);
  const newTime = new Date();
  newTime.setHours(hour24);
  newTime.setMinutes(minutes);
  return newTime;
};

export const doesTimeMatchCurrentTime = (time: string) => {
  const givenTimeObject = getTimeAsDate(time);
  if (!givenTimeObject) {
    return false;
  }
  const now = new Date();
  return (
    now.getHours() === givenTimeObject.getHours() &&
    now.getMinutes() === givenTimeObject.getMinutes()
  );
};
