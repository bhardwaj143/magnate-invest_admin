import axios from "../../instance";
import * as constants from "../../constants/appConstants";
import * as url from "../../constants/urlConstants";

export const ADD_USER = "ADD_USER";
export const GET_ALL_USER = "GET_ALL_USER";
export const GET_USER = "GET_USER";
export const DELETE_USER = "DELETE_USER";
export const GET_RECENT_USERS = "GET_RECENT_USERS";

export const addingUser = (data) => {
  return async (dispatch) => {
    const res = await axios.post(url.addingUser, data);
    if (res && res.status === 200) {
      return 200;
    } else if (res && res.error && res.error === true) {
      return res;
    }
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
    const res = await axios.get(url.gettingUser(data));
    console.log(res);
    if (res && res.status && res.status === 200) {
      dispatch(getUser(res.data.data));
    } else if (res && res.error === true && res.message === "No user id") {
      return 404;
    } else {
      return 500;
    }
  };
};

export const getAllUser = (data) => {
  return {
    type: GET_ALL_USER,
    data: data,
  };
};

export const gettingAllUser = (page, search) => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingAllUser(page, search));
    if (res.error === true) {
      return res;
    } else if (res && res.status && res.status === 500) {
      return 500;
    } else if (
      res.data &&
      res.data.response &&
      res.data.response.length === 0
    ) {
      dispatch(getAllUser(res.data));
      return 404;
    } else {
      dispatch(getAllUser(res.data));
      return 200;
    }
  };
};

export const updatingUser = (id, data) => {
  return async (dispatch) => {
    const res = await axios.post(url.updatingUser(id), data);
    if (res && res.status === 200) {
      return 200;
    } else if (res && res.error === true) {
      return res;
    }
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
    const res = await axios.get(url.deletingUser(id));
    if (res && res.status === 200) {
      // dispatch(deleteUser(id));
      return 200;
    } else if (res && res.status && res.status === 500) {
      return 500;
    }
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
    console.log(res);
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
      user_id: id,
      status: status === 0 ? 1 : 0,
    };
    const res = await axios.post(url.changingStatus, data);
    if (res && res.status === 200) {
      return 200;
    } else if (res && res.status === 500) {
      return 500;
    }
  };
};
