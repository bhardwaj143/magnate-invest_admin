import * as constants from "../../constants/appConstants";
import * as url from "../../constants/urlConstants";
import axios from "../../instance";

export const loggingUser = (data) => {
  return async (dispatch) => {
    const res = await axios.post(url.loggingUser, data);
    // console.log(res);
    if (res && res.status && res.status === 200) {
      localStorage.setItem("magneto-access-token", res.data.data.accessToken);
      localStorage.setItem("magneto-refresh-token", res.data.data.refreshToken);
    }
    return res;
  };
};

export const loggingOut = () => {
  return async (dispatch) => {
    await localStorage.removeItem("magneto-access-token");
    await localStorage.removeItem("magneto-refresh-token");
    return true;
  };
};
