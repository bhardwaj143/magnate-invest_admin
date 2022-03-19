import * as actionTypes from "../actions/categoryAction";

const initialState = {
    categories: '',
    totalCategory: '',
    category: '',
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case actionTypes.GET_ALL_CATEGORY: {
            return {
                ...state,
                categories: action.data
            }
        }
        case actionTypes.TOTAL_RECORDS_CATEGORY: {
            return {
                ...state,
                totalCategory: action.data
            }
        }
        case actionTypes.GET_PARTICULAR_CATEGORY: {
            return {
                ...state,
                category: action.data
            }
        }
        default : return state
    }
} 

export default reducer