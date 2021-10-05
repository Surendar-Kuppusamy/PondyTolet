import {
    SITE_LOADER,
    BULK_FORM,
    BULK_LOADER,
    BULK_RESULT,
    NEW_CITY
} from '../constants/constants';


/* const allOptions = localStorage.getItem('alloptions')
  ? JSON.parse(localStorage.getItem('alloptions'))
  : {} */

const initialState = {
    site_loader: false,
    bulk_loader: false,
    bulk_form: {},
    bulk_result: {}
};

export const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SITE_LOADER: {
            return {...state }
        }
        case BULK_LOADER: {
            return {...state, bulk_loader: !state.bulk_loader}
        }
        case BULK_FORM: {
            return {...state, bulk_form: action.payload}
        }
        case BULK_RESULT: {
            return { ...state, bulk_result: action.payload }
        }
        case NEW_CITY: {
            return { ...state, new_city: action.payload }
        }
        default:
            return state;
    }
}