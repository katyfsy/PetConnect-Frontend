const getBearerToken = () => {
  return localStorage.getItem("token") === null
    ? JSON.parse(sessionStorage.getItem("token"))
    : JSON.parse(localStorage.getItem("token"));
};

const getUser = () => {
  return localStorage.getItem("username") === null
    ? sessionStorage.getItem("username")
    : localStorage.getItem("username");
};

const setTokenLocal = (token) => {
  localStorage.setItem("token", JSON.stringify(token));
};

const setTokenSession = (token) => {
  sessionStorage.setItem("token", JSON.stringify(token));
};

const setUserNameLocal = (username) => {
  localStorage.setItem("username", username);
};

const setUserNameSession = (username) => {
  sessionStorage.setItem("username", username);
};

export {
  getBearerToken,
  getUser,
  setTokenLocal,
  setTokenSession,
  setUserNameLocal,
  setUserNameSession,
};
