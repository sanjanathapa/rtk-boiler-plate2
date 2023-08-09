/* eslint-disable */
console.log(`Mode => ${process.env.REACT_APP_MODE}`);
const Constants = {
  SERVER_URL: process.env.REACT_APP_BACKEND_API_PRIVATE_BASE_URL,
  SECRET_HASH_KEY: process.env.REACT_APP_SECRET_KEY,
};

export default Constants;
