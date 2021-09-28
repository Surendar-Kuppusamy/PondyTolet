import {
    SITE_LOADER,
    ASSET_FORM,
    ASSET_LOADER,
    ALL_OPTIONS,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../constants/constants';


const allOptions = localStorage.getItem('alloptions')
  ? JSON.parse(localStorage.getItem('alloptions'))
  : {}

const initialState = {
    site_loader: false,
    alloptions: allOptions,
    asset_loader: false,
    asset_result: {}
};

export const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SITE_LOADER: {
            return {...state }
        }
        case ASSET_LOADER: {
            return {...state, asset_loader: false }
        }
        case ASSET_FORM: {
            let assetForm = action.payload;
            return {...state, asset_form: assetForm, asset_loader: true }
        }
        case ALL_OPTIONS: {
            let alloptions = action.payload;
            localStorage.setItem('alloptions', JSON.stringify(alloptions));
            return { ...state, alloptions }
        }
        default:
            return state;
    }
}


export const assetReducer1 = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_FAIL:
        return { }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
}