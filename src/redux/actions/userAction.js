import axios from "../../instance";
import * as constants from "../../constants/appConstants";
import * as url from "../../constants/urlConstants";

export const ADD_USER = "ADD_USER";
export const GET_ALL_USER = "GET_ALL_USER";
export const GET_USER = "GET_USER";
export const DELETE_USER = "DELETE_USER";
export const GET_RECENT_USERS = "GET_RECENT_USERS";
export const TOTAL_USER_DATA = "TOTAL_USER_DATA";

export const addingUser = (data) => {
  return async (dispatch) => {
    const res = await axios.post(url.addingUser, data);
    // console.log(res);
    return res;
  };
};

export const getUser = (data) => {
  return {
    type: GET_USER,
    data: data,
  };
};

export const gettingUser = (data) => {
  return async (dispatch) => {
    // console.log(data)
    const res = await axios.get(url.gettingUser(data));
    // console.log(res);
    if (res && res.status && res.status === 200) {
      dispatch(getUser(res.data.data));
    }
    return res;
  };
};

export const getAllUsers = (data) => {
  return {
    type: GET_ALL_USER,
    data: data,
  };
};

export const getTotalRecord = (data) => {
  return {
    type: TOTAL_USER_DATA,
    data: data,
  };
};

export const gettingAllUsers = (page, search,limit, date) => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingAllUsers(page, search,limit, date));
    // console.log(res);
    if (res.status && res.status === 200) {
      if (res.data.data.length === 0) {
        dispatch(getTotalRecord(res.data.meta));
        return { status: 404 };
      } else {
        dispatch(getAllUsers(res.data.data));
        dispatch(getTotalRecord(res.data.meta));
      }
    }
    return res;
  };
};

export const updatingUser = (id, data) => {
  return async (dispatch) => {
    const res = await axios.put(url.updatingUser(id), data);
    // console.log(res);
    return res;
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    data: id,
  };
};

export const deletingUser = (id) => {
  return async (dispatch) => {
    const res = await axios.delete(url.deletingUser(id));
    // console.log(res)
    return res
  };
};

export const getRecentUsers = (data) => {
  return {
    type: GET_RECENT_USERS,
    data: data,
  };
};

export const gettingRecentUsers = () => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingRecentUsers);
    // console.log(res);
    if (res.status === 200) {
      if (res.data.response && res.data.response.length > 0) {
        dispatch(getRecentUsers(res.data.response));
        return 200;
      } else {
        return 404;
      }
    } else if (res && res.status === 500) {
      return 500;
    }
  };
};

export const changingStatus = (id, status) => {
  return async (dispatch) => {
    const data = {
      status: status === true ? "0" : "1",
    };
    const res = await axios.put(url.changingStatus(id), data);
    // console.log(res);
    return res;
  };
};
