import axios from 'axios';
import { USER_LOADER, SIGNUP_RESULT, SIGNUP_ERROR, LOGIN_FORM_RESULT } from '../constants/constants';
import { USERSIGNUP, USER_LOGIN } from '../constants/Apiconstants';
import { CUSTOM_ERRORS } from '../config/globalConstant';

/* const config = {
    headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
    }
} */

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${(localStorage.getItem("token")? localStorage.getItem("token") : '')}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
}, null, { synchronous: true });

export const signup = () => async (dispatch, getState) => {
    const state = getState();
    const { userState } = state;
    try {
        const { data } = await axios.post(
            USERSIGNUP,
            userState.signup_form
        );
        console.log('Try ==>'+JSON.stringify(data));
        dispatch({type:SIGNUP_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
        let tempData = { status: 'error', message: 'Something went wrong', 'error': error  };
        dispatch({type:SIGNUP_RESULT, payload: tempData});
    }
}

export const login = () => async (dispatch, getState) => {
    const state = getState();
    const { userState } = state;
    try {
        const { data } = await axios.post(
            USER_LOGIN,
            userState.login_form
        );
        console.log('Try ==>'+JSON.stringify(data));
        dispatch({type:LOGIN_FORM_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
        let tempData = { status: 'error', message: 'Something went wrong', 'error': error  };
        dispatch({type:LOGIN_FORM_RESULT, payload: tempData});
    }   
}