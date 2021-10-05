import {
    SITE_LOADER,
    USER_INFO,
    USER_LOADER,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    SIGNUP_FORM,
    SIGNUP_RESULT,
    SIGNUP_ERROR,
    LOGIN_FORM,
    LOGIN_FORM_RESULT
} from '../constants/constants';


const user_info = localStorage.getItem('user_info')
  ? JSON.parse(localStorage.getItem('user_info'))
  : {}

const initialState = {
    site_loader: false,
    user_loader: false,
    user_info: user_info,
    signup_result:{}
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SITE_LOADER: {
            return {...state }
        }
        case SIGNUP_FORM: {
            return {...state, signup_form:action.payload, user_loader: true }
        }
        case SIGNUP_RESULT: {
            return {...state, signup_result:action.payload, user_loader: false }
        }
        case SIGNUP_ERROR: {
            return {...state, signup_error:action.payload, user_loader: false }
        }
        case LOGIN_FORM: {
            return {...state, login_form:action.payload, user_loader: true }
        }
        case LOGIN_FORM_RESULT: {
            return {...state, login_form_result:action.payload, user_loader: false }
        }
        case USER_LOADER: {
            return {...state, user_loader:action.payload }
        }
        case USER_INFO: {
            let user_details = action.payload;
            return { ...state, user_info:user_details }
        }
        default:
            return state;
    }
}