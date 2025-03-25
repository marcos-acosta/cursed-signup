export const combineClasses = (
  ...classnames: (string | false | undefined | null)[]
) => classnames.filter(Boolean).join(" ");

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REHEX = /^#[0-9a-f]{6}$/;
const MBTI_REGEX = /^[IE][SN][TF][JP]$/;

export const isValidEmail = (email: string) => EMAIL_REGEX.test(email);
export const isValidHex = (hex: string) => REHEX.test(hex);
export const isValidMbti = (mbti: string) => MBTI_REGEX.test(mbti);
