import * as actionTypes from "../actions/animalAction";

const initialState = {
  total_record: "",
  animals: [],
  animal: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ANIMALS_DATA: {
      return { ...state, animals: action.data };
    }
    case actionTypes.TOTAL_ANIMALS_RECORD: {
      return {
        ...state,
        total_record: action.data.total_records,
      };
    }
    case actionTypes.GET_ANIMAL: {
      return {
        ...state,
        animal: action.data && action.data[0] ? action.data[0] : '' ,
      };
    }
    default:
      return state;
  }
};

export default reducer;
