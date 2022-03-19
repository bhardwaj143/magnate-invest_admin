import axios from "../../instance";
import * as url from "../../constants/urlConstants";

export const GET_ALL_SETTINGS = "GET_ALL_SETTINGS";
export const TOTAL_RECORDS_SETTING = "TOTAL_RECORDS_SETTING";
export const GET_PARTICULAR_SETTING = "GET_PARTICULAR_SETTING";


const getAllSettings = (data) => {
    return {
        type: GET_ALL_SETTINGS,
        data
    }
}

const getTotalRecord = (data) => {
    return {
        type: TOTAL_RECORDS_SETTING,
        data
    }
}

export const gettingAllSettings = (page, limit) => {
    return async(dispatch) => {
        const res = await axios.get(url.gettingAllSettings(page,limit));
        console.log(res)
    if (res.status && res.status === 200) {
      if (res.data.data.length === 0) {
        dispatch(getTotalRecord(res.data.meta.total_records));
        return { status: 404 };
      } else {
        dispatch(getAllSettings(res.data.data));
        dispatch(getTotalRecord(res.data.meta.total_records));
      }
    }
    return res;
    }
}

export const addingSetting = (data) => {
  return async (dispatch) => {
    const res = await axios.post(url.addingSetting, data);
    // console.log(res);
    return res;
  };
};

const getParticularSetting = (data) => {
  return {
    type: GET_PARTICULAR_SETTING,
    data
  }
}

export const gettingParticularSetting = (data) => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingParticularSetting(data));
    if (res && res.status && res.status === 200) {
      dispatch(getParticularSetting(res.data.data));
    }
    return res;
  };
}

export const updatingSetting = (id, data) => {
  return async (dispatch) => {
    const res = await axios.patch(url.updatingSetting(id), data);
    return res;
  };
};

export const deletingSetting = (id) => {
    return async (dispatch) => {
        const res = await axios.delete(url.deletingSetting(id));
        return res
      };
}