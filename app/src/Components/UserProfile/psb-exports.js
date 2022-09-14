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

const clearStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
  }

const PSB_API_URL = "http://a543b64cddf7d436b98ac207005d3349-171391594.us-west-2.elb.amazonaws.com";

export {
  getBearerToken,
  getUser,
  setTokenLocal,
  setTokenSession,
  setUserNameLocal,
  setUserNameSession,
  clearStorage,
  PSB_API_URL
};
