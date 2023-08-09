import { useSelector, shallowEqual } from "react-redux";
import { get } from "utils/lodash";

const REGEX = {
  IS_EMAIL: /\S+@\S+\.\S{2,}/,
  IS_PWD: /^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,}$/,
  IS_MOBILE_NO: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  IS_NUMBER_ONLY: /^[0-9\b]+$/,
  IS_EMPTY_STRING: /^\s+$/,
  IS_URL: /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
};

export const isEmail = (email) => REGEX.IS_EMAIL.test(email);
export const isPassword = (password) => REGEX.IS_PWD.test(password);
export const isMobileNo = (mobile) => REGEX.IS_MOBILE_NO.test(mobile);
export const isNumber = (value) => REGEX.IS_NUMBER_ONLY.test(value);
export const isEmptyString = (value) => REGEX.IS_EMPTY_STRING.test(value);
export const isUrl = (value) => REGEX.IS_URL.test(value);

export const MISCurrentUser = () => {
  const { loginToken, user, accesses } = useSelector(
    (state) => ({
      loginToken: get(state, "LoginSlice.loginToken", null),
      user: get(state, "LoginSlice.user", null),
      accesses: get(state, "LoginSlice.accesses", []),
    }),
    shallowEqual
  );

  const sessionToken = sessionStorage.getItem("token") || loginToken;
  return { sessionToken, user, accesses };
};
