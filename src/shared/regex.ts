export namespace REGEX {
  export const STRONG_PASSWORD_REGEX =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  export const DATE_FORMAT = /^\d{2}\/\d{2}\/\d{4}$/;

  export const TIME_FORMAT = /^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/;
}
