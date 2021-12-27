import {
    SITE_LOADER,
    ASSET_FORM,
    ASSET_LOADER,
    ALL_OPTIONS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    ASSET_RESULT,
    PUSH_OPTION
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
        case ASSET_RESULT: {
            let assetForm = action.payload;
            return {...state, asset_result:action.payload, asset_loader: false }
        }
        case ALL_OPTIONS: {
            let alloptions = action.payload;
            localStorage.setItem('alloptions', JSON.stringify(alloptions));
            return { ...state, alloptions }
        }
        case PUSH_OPTION: {
            if(action.payload.fieldType == 1) {
                return {  ...state, ...state.alloptions.city_options.unshift(action.payload.option) }
            } else if(action.payload == 2) {
                return {  ...state, ...state.alloptions.state_options.unshift(action.payload.option) }
            } else if(action.payload == 3) {
                return {  ...state, ...state.alloptions.who_can_contact_options.unshift(action.payload.option) }
            }
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