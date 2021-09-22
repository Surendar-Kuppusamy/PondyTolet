//import axios from "axios";
import { LOGIN, ALL_OPTIONS, TYPE_OF_ASSET_OPTIONS, ASSET_FOR_OPTIONS, WHO_CAN_CONTACT_OPTIONS, ASSET_STATUS_NOW_OPTIONS, SHOW_MY_ASSET_FOR_TENANTS_OPTIONS, LIKE_OR_DISLIKE_OPTIONS, IS_PROPOSAL_CANCELLED_OPTIONS,  ASSET_HEIGHT_WIDTH_OPTIONS } from './constants';


export const registerUser = (userData) => dispatch => {

    /* axios
      .post("https://reqres.in/api/login", userData)
      .then(res => history.push("/login"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      ); */
};


export const loadOptions = () => dispatch => {
	dispatch({type:ALL_OPTIONS});
};

export const loginUser = (userData) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: userData
    })
};