import * as actionTypes from "../actions/userAction";

const initialState = {
  users: [],
  user: "",
  total_users: "",
  recent_users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USER: {
      return { ...state, users: action.data };
    }
    case actionTypes.TOTAL_USER_DATA: {
      return {
        ...state,
        total_users: action.data.total_records,
      };
    }
    case actionTypes.GET_USER: {
      return {
        ...state,
        user: action.data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
