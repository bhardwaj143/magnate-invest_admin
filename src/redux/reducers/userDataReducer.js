import * as actionTypes from "../actions/userAction";

const initialState = {
  users: [],
  user: "",
  pages: "",
  recent_users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_USER: {
      return {
        ...state,
        users: action.data.response,
        pages: action.data.total,
      };
    }
    case actionTypes.GET_USER: {
      return {
        ...state,
        user: action.data,
      };
    }
    case actionTypes.DELETE_USER: {
      const updatedArray = state.users.filter((el) => el.id !== action.data);
      return {
        ...state,
        users: updatedArray,
      };
    }
    case actionTypes.GET_RECENT_USERS: {
      return {
        ...state,
        recent_users: action.data,
      };
    }
  }
  return state;
};

export default reducer;
