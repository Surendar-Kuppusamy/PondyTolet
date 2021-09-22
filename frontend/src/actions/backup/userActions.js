//import axios from "axios";
import { LOGIN } from './constants';


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


export const loginUser = (userData) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: userData
    })
};