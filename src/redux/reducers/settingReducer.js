import * as actionTypes from "../actions/settingAction";

const initialState = {
    settings: '',
    totalSetting: '',
    setting: '',
}

const reducer = (state = initialState, action) => {
    switch(action.type)
    {
        case actionTypes.GET_ALL_SETTINGS: {

            console.log(action.data)
            return {
                ...state,
                settings: action.data
            }
        }
        case actionTypes.TOTAL_RECORDS_SETTING: {
            return {
                ...state,
                totalSetting: action.data
            }
        }
        case actionTypes.GET_PARTICULAR_SETTING: {
            return {
                ...state,
                setting: action.data
            }
        }
        default : return state
    }
} 

export default reducer