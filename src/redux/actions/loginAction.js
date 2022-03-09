import axios from "../../instance";
import * as url from "../../constants/urlConstants";
import ToggleNotification from "../../component/ReusableComponents/Toggle Notifications/ToggleNotification";

export const loggingUser = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(url.loggingUser, data);
      localStorage.setItem("keshavi-token", res.data?.data?.token);
      return res;
    } catch (err) {
      ToggleNotification("Error", err.response.data.message);
      // console.log(err.response.data.message);
    }
  };
};

export const loggingOut = () => {
  return async (dispatch) => {
    try {
      await localStorage.removeItem("quota-games-token");
      return true;
    } catch (err) {
      ToggleNotification("Error", "Cannot be logged out. Please try again later.");
    }
  };
};
