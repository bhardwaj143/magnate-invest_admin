import axios from "../../instance";
import * as url from "../../constants/urlConstants";

export const GET_ALL_BLOGS = "GET_ALL_BLOGS";
export const TOTAL_RECORDS = "TOTAL_RECORDS";
export const GET_PARTICULAR_BLOG = "GET_PARTICULAR_BLOG";


const getAllBlogs = (data) => {
    return {
        type: GET_ALL_BLOGS,
        data
    }
}

const getTotalRecord = (data) => {
    return {
        type: TOTAL_RECORDS,
        data
    }
}

export const gettingAllBlogs = (page, limit) => {
    return async(dispatch) => {
        const res = await axios.get(url.gettingAllBlogs(page,limit));
        console.log(res)
    if (res.status && res.status === 200) {
      if (res.data.data.length === 0) {
        dispatch(getTotalRecord(res.data.meta.total_records));
        return { status: 404 };
      } else {
        dispatch(getAllBlogs(res.data.data));
        dispatch(getTotalRecord(res.data.meta.total_records));
      }
    }
    return res;
    }
}


export const addingBlog = (data) => {
  debugger
  return async (dispatch) => {
    const res = await axios.post(url.addingBlog, data);
    return res;
  };
};

const getParticularBlog = (data) => {
  return {
    type: GET_PARTICULAR_BLOG,
    data
  }
}

export const gettingParticularBlog = (data) => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingParticularBlog(data));
    if (res && res.status && res.status === 200) {
      dispatch(getParticularBlog(res.data.data));
    }
    return res;
  };
}

export const updatingBlog = (id, data) => {
  return async (dispatch) => {
    const res = await axios.patch(url.updatingBlog(id), data);
    return res;
  };
};

export const deletingBlog = (id) => {
    return async (dispatch) => {
        const res = await axios.delete(url.deletingBlog(id));
        return res
      };
}