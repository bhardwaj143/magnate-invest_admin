import axios from "../../instance";
import * as url from "../../constants/urlConstants";

export const forgetPasswordEmail = (data) => {
  return async (dispatch) => {
    const res = await axios.post(url.forgetPasswordEmail, data);
    // console.log(res);
    if (res && res.status && res.status === 200) {
      localStorage.setItem("bovinae-forgot-token-1", res.data.data.accessToken);
      return { status: 200 };
    } else if ((res && res.code && res.code === 400) || res.code === 404) {
      return { status: 400, message: res.message };
    } else if (res && res.status && res.status === 500) {
      return { status: 500 };
    }
  };
};

export const forgetPasswordOtp = (data) => {
  return async (dispatch) => {
    const res = await axios.post(url.forgetPasswordOtp, data);
    if (res && res.status && res.status === 200) {
      localStorage.setItem("bovinae-forgot-token-2", res.data.data.accessToken);
      return { status: 200 };
    } else if ((res && res.code && res.code === 400) || res.code === 404) {
      return { status: 400, message: res.message };
    } else if (res && res.status && res.status === 500) {
      return { status: 500 };
    }
  };
};

export const resetForgetPassword = (data) => {
  return async (dispatch) => {
    const res = await axios.patch(url.resetForgetPassword, data);
    // console.log(res);
    if (res && res.status && res.status === 200) {
      localStorage.removeItem("bovinae-forgot-token-1");
      localStorage.removeItem("bovinae-forgot-token-2");
      return { status: 200 };
    } else if ((res && res.code && res.code === 400) || res.code === 404) {
      return { status: 400, message: res.message };
    } else if (res && res.status && res.status === 500) {
      return { status: 500 };
    }
  };
};

export const changingPassword = (data) => {
  return async (dispatch) => {
    const res = await axios.patch(url.changingPassword, data);
    // console.log(res);
    if (res && res.status && res.status === 200) {
      return { status: 200 };
    } else if ((res && res.code && res.code === 400) || res.code === 404) {
      return { status: 400, message: res.message };
    } else if (res && res.status && res.status === 500) {
      return { status: 500 };
    }
  };
};
