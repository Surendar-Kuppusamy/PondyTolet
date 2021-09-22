import {
    SITE_LOADER,
    TYPE_OF_ASSET_OPTIONS, 
    ASSET_FOR_OPTIONS,
    WHO_CAN_CONTACT_OPTIONS,
    SET_WHO_CAN_CONTACT_OPTIONS,
    ASSET_STATUS_NOW_OPTIONS,
    SHOW_MY_ASSET_FOR_TENANTS_OPTIONS,
    LIKE_OR_DISLIKE_OPTIONS,
    IS_PROPOSAL_CANCELLED_OPTIONS,
    ASSET_LENGTH_WIDTH_OPTIONS,
    ALL_OPTIONS,
    ALLOPT,
    USER_LOGIN_FAIL,
    USER_LOGOUT
} from '../constants/constants';


const allOptions = localStorage.getItem('alloptions')
  ? JSON.parse(localStorage.getItem('alloptions'))
  : {}

const initialState = {
    site_loader: false,
    alloptions: allOptions
};

export const assetReducer = (state = initialState, action) => {
    switch (action.type) {
        case SITE_LOADER: {
            return {...state }
        }
        case TYPE_OF_ASSET_OPTIONS: {
            return { ...state }
        }
        case ASSET_FOR_OPTIONS: {
            return { ...state }
        }
        case WHO_CAN_CONTACT_OPTIONS: {
            return { ...state }
        }
        case ASSET_STATUS_NOW_OPTIONS: {
            return { ...state }
        }
        case SHOW_MY_ASSET_FOR_TENANTS_OPTIONS: {
            return { ...state }
        }
        case LIKE_OR_DISLIKE_OPTIONS: {
            return { ...state }
        }
        case IS_PROPOSAL_CANCELLED_OPTIONS: {
            return { ...state }
        }
        case ASSET_LENGTH_WIDTH_OPTIONS: {
            return { ...state }
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