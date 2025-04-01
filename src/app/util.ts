export const combineClasses = (
  ...classnames: (string | false | undefined | null)[]
) => classnames.filter(Boolean).join(" ");

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REHEX = /^#[0-9a-fA-F]{6}$/;
const MBTI_REGEX = /^[IE][SN][TF][JP]$/;
const NUMBER_REGEX = /^[0-9]*\.?[0-9]*$/;

export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);
export const isValidHex = (hex: string) => REHEX.test(hex);
export const isValidMbti = (mbti: string) =>
  MBTI_REGEX.test(mbti.toUpperCase());
export const isValidNumber = (num: string) => NUMBER_REGEX.test(num);

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
