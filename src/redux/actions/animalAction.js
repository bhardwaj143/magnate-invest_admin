import axios from "../../instance";
import * as url from "../../constants/urlConstants";

export const ANIMALS_DATA = "ANIMALS_DATA";
export const TOTAL_ANIMALS_RECORD = "TOTAL_ANIMALS_RECORD";
export const GET_ANIMAL = "GET_ANIMAL";

export const getAllAnimals = (data) => {
  return {
    type: ANIMALS_DATA,
    data: data,
  };
};

export const getTotalAnimalsRecord = (data) => {
  return {
    type: TOTAL_ANIMALS_RECORD,
    data: data,
  };
};

export const gettingAnimalsData = (page, search, type) => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingAnimalsData(page, search, type));
    // console.log(res);
    if (res.status && res.status === 200) {
      if (res.data.data.length === 0) {
        dispatch(getTotalAnimalsRecord(res.data.meta));
        return { status: 404 };
      } else {
        dispatch(getAllAnimals(res.data.data));
        dispatch(getTotalAnimalsRecord(res.data.meta));
      }
    }
    return res;
  };
};

export const getAnimal = (data) => {
  return {
    type: GET_ANIMAL,
    data: data,
  };
};

export const gettingAnimal = (data) => {
  return async (dispatch) => {
    const res = await axios.get(url.gettingAnimal(data));
    // console.log(res);
    if (res && res.status && res.status === 200) {
      dispatch(getAnimal(res.data.data));
    }
    return res;
  };
};

export const deletingAnimal = (data) => {
  return async(dispatch) => {
    const res = await axios.delete(url.deletingAnimal(data));
    // console.log(res);
    return res
  }
}