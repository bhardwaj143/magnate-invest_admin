import axios from "../../instance";
import * as url from "../../constants/urlConstants";
import ToggleNotification from "../../component/ReusableComponents/Toggle Notifications/ToggleNotification";

export const forgetPasswordEmail = (data) => {
  return async (dispatch) => {
    try{
      const res = await axios.post(url.forgetPasswordEmail, data);
      if (res.status && res.status === 200) {
        localStorage.setItem("keshavi-forgot-token-1", res.data.data.token);
      }
      return res;
    }
    catch(err){
      ToggleNotification('Error', err.response.data.message)
    }
  };
};

export const forgetPasswordOtp = (data) => {
  return async (dispatch) => {
    try{
      const res = await axios.post(url.forgetPasswordOtp, data);
      if (res.status && res.status === 200) {
        localStorage.setItem("keshavi-forgot-token-2", res.data.data.token);
      }
      return res;
    }
    catch(err)
    {
      ToggleNotification('Error', err.response.data.message)
    }
  };
};

export const resetForgetPassword = (data) => {
  return async (dispatch) => {
    try{
      const res = await axios.patch(url.resetForgetPassword, data);
      if (res.status && res.status === 200) {
        localStorage.removeItem("keshavi-forgot-token-1");
        localStorage.removeItem("keshavi-forgot-token-2");
      }
      return res;
    }
    catch(err)
    {
      ToggleNotification('Error', err.response.data.message)
    }
  };
};

export const changingPassword = (data) => {
  return async (dispatch) => {
    try{
      const res = await axios.post(url.changingPassword, data);
      return res;
    }
    catch(err)
    {
      console.log(err)
    }
  };
};
