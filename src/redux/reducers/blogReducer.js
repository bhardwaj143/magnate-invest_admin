import * as actionTypes from "../actions/blogAction";

const initialState = {
    blogs: '',
    totalBlogs: '',
    blog: '',
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case actionTypes.GET_ALL_BLOGS: {
            return {
                ...state,
                blogs: action.data
            }
        }
        case actionTypes.TOTAL_RECORDS: {
            return {
                ...state,
                totalBlogs: action.data
            }
        }
        case actionTypes.GET_PARTICULAR_BLOG: {
            return {
                ...state,
                blog: action.data
            }
        }
        default : return state
    }
} 

export default reducer