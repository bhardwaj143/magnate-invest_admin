import axios from "axios";
import * as url from "./constants/urlConstants";

const instance = axios.create({
  baseURL: "http://3.88.73.172:3001/v1",
});

const requestHandler = async (config) =>  {
    config.headers["Authorization"] = await localStorage.getItem("magneto-access-token");
    return config;
  }


const forgetHandlerOne = (request) => {
  request.headers["Authorization"] = `${localStorage.getItem(
    "magneto-forgot-token-1"
  )}`;
  return request;
};

const forgetHandlerTwo = (request) => {
  request.headers["Authorization"] = `${localStorage.getItem(
    "magneto-forgot-token-2"
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
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    const originalRequest = err.config;
    let refreshToken = localStorage.getItem("refreshToken");
    if (err && err?.response?.data?.code === 400) {
      return err.response.data;
    } else if (
      refreshToken &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      let res = await instance.post(`/auth/refresh-token`, {
        refreshToken: refreshToken,
      });
      if (res.status && res.status === 200) {
        unAutherized(res.data.data);
        originalRequest.headers = {
          "Authorization": res.data.data.accessToken,
        };
        return instance(originalRequest);
      } else  {
        loggingOutUser();
      }
    } else {
      return err && err.response && err.response.data
        ? err.response.data
        : { status: 500 };
    }
  }
);

const unAutherized = (data) => {
  localStorage.setItem("magneto-access-token", data.accessToken)
  localStorage.setItem("magneto-refresh-token", data.refreshToken);
};

const loggingOutUser = () => {
  if (localStorage.getItem("magneto-access-token")) {
    localStorage.removeItem("magneto-access-token");
    localStorage.removeItem("magneto-refresh-token");
    window.location.href = "/login";
  }
};  

export default instance;
