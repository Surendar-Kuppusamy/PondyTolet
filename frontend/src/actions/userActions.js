import axios from 'axios';
import { USER_LOADER, SIGNUP_RESULT, SIGNUP_ERROR } from '../constants/constants';
import { USERSIGNUP } from '../constants/Apiconstants';


export const signup = () => async (dispatch, getState) => {
    const state = getState();
    const { userState } = state;
    console.log('Action==>'+JSON.stringify(userState.signup_form));
    
    try {
        const { data } = await axios.post(
            USERSIGNUP,
            userState.signup_form
        );
        dispatch({type:SIGNUP_RESULT, payload: data});
    } catch(error) {
        let tempData = { status: 'error', message: 'Something went wrong', 'error': error  };
        dispatch({type:SIGNUP_RESULT, payload: tempData});
    }
    
    
    //dispatch({type:USER_LOADER, payload: false});
}