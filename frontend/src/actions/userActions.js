import axios from 'axios';
import { USER_LOADER, SIGNUP_RESULT, SIGNUP_ERROR } from '../constants/constants';
import { USERSIGNUP } from '../constants/Apiconstants';

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