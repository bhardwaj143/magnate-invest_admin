import axios from "../../instance";
import * as url from "../../constants/urlConstants";

export const GET_ALL_CATEGORY = "GET_ALL_CATEGORY";
export const TOTAL_RECORDS_CATEGORY = "TOTAL_RECORDS_CATEGORY";
export const GET_PARTICULAR_CATEGORY = "GET_PARTICULAR_CATEGORY";


const getAllCategories = (data) => {
    return {
        type: GET_ALL_CATEGORY,
        data
    }
}

const getTotalRecord = (data) => {
    return {
        type: TOTAL_RECORDS_CATEGORY,
        data
    }
}

export const gettingAllCategories = (page, limit) => {
    return async(dispatch) => {
        const res = await axios.get(url.gettingAllCategories(page,limit));
        console.log(res)
    if (res.status && res.status === 200) {
      if (res.data.data.length === 0) {
        dispatch(getTotalRecord(res.data.meta.total_records));
        return { status: 404 };
      } else {
        dispatch(getAllCategories(res.data.data));
        dispatch(getTotalRecord(res.data.meta.total_records));
      }
    }
    return res;
    }
}

export const addingCategory = (data) => {
  return async (dispatch) => {
    const res = await axios.post(url.addingCategory, data);
    // console.log(res);
    return res;
  };
};

const getParticularCategory = (data) => {
  return {
    type: GET_PARTICULAR_CATEGORY,
    data
  }
}

export const gettingParticularCategory = (data) => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingParticularCategory(data));
    if (res && res.status && res.status === 200) {
      dispatch(getParticularCategory(res.data.data));
    }
    return res;
  };
}

export const updatingCategory = (id, data) => {
  return async (dispatch) => {
    const res = await axios.patch(url.updatingCategory(id), data);
    return res;
  };
};

export const deletingCategory = (id) => {
    return async (dispatch) => {
        const res = await axios.delete(url.deletingCategory(id));
        return res
      };
}