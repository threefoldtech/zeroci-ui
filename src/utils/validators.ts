import validator from "validator";

export const isDomain = (msg: string) => (url: string) =>
  validator.isURL(url) ? true : msg;
