import axios from "axios";
import * as constants from "./constants/appConstants";
import * as url from "./constants/urlConstants";
import ToggleNotification from "./component/ReusableComponents/Toggle Notifications/ToggleNotification";

const instance = axios.create({
  // baseURL: "http://5fc1f26f427d.ngrok.io/QuotaGames/api/auth",
  baseURL: "https://keshavi.dmlabs.in",
  // headers: {
  //   Authorization: localStorage.getItem('keshavi-token') ? `Bearer ${localStorage.getItem('keshavi-token')}` : null,
  //   "Content-Type": "application/json",
  //   accept: "application/json",
  //   "Access-Control-Allow-Origin": "*",
  // },
});

const requestHandler = (request) => {
  request.headers["Authorization"] = `${constants.token}`;
  return request;
};

const forgetHandlerOne = (request) => {
  request.headers["Authorization"] = `${localStorage.getItem(
    "keshavi-forgot-token-1"
  )}`;
  return request;
};

const forgetHandlerTwo = (request) => {
  request.headers["Authorization"] = `${localStorage.getItem(
    "keshavi-forgot-token-2"
  )}`;
  return request;
};

instance.interceptors.request.use((request) => {
  if (request.url === url.forgetPasswordOtp) {
    forgetHandlerOne(request);
  } else if (request.url === url.resetForgetPassword) {
    forgetHandlerTwo(request);
  } else {
    requestHandler(request);
  }
  return request;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(
      err && err.response && err.response.data ? err.response.data : null
    );
    if(err && err.response?.status === 500)
    {
      return { status: 500 };
    }
    if (
      err &&
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      return unAutherized();
    } else {
      if (err && err.response && err.response.data) {
        throw err;
      } else {
        throw {response: { status: 500} };
      }
    }
  }
);

const unAutherized = () => {
  if (localStorage.getItem("quota-games-token")) {
    localStorage.removeItem("quota-games-token");
    window.location.href = "/login";
  }
};

export default instance;
