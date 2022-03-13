import axios from "../../instance";
import * as url from "../../constants/urlConstants";

export const DASHBOARD_CARD = "DASHBOARD_CARD";

export const getDashboardDetail = (data) => {
    // console.log("here comes the data ", data);
    return {
        type: DASHBOARD_CARD,
        data: data
    }
}

export const gettingDashboardDetail = () => {
    return async(dispatch) => {
        const res = await axios.get(url.gettingDashboardDetail);
        // console.log(res);
        if(res && res.status && res.status === 200)
        {
            // console.log("here comes the response")
            dispatch(getDashboardDetail(res.data.data));
        }
        return res;
    }
}