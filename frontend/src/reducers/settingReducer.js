import {
    SITE_LOADER
} from '../constants/constants';


const allOptions = localStorage.getItem('alloptions')
  ? JSON.parse(localStorage.getItem('alloptions'))
  : {}

const initialState = {
    site_loader: false,
    alloptions: allOptions
};

export const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SITE_LOADER: {
            return {...state }
        }
        default:
            return state;
    }
}