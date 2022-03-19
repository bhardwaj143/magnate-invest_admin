import * as actionTypes from "../actions/dashboardAction";

const initialState = {
  total_users: "",
  total_animals: "",
  today_registered_users: "",
};

const reducer = (state = initialState, action) => {
    // console.log(action.type)
  switch (action.type) {
    case actionTypes.DASHBOARD_CARD : {
        // console.log("its here")
        return {
            ...state,
            total_users: action.data.totalUsers,
            total_animals: action.data.totalAnimals,
            today_registered_users: action.data.todayRegisteredUser
        }
    }
    default:
      return state;
  }
};

export default reducer;
