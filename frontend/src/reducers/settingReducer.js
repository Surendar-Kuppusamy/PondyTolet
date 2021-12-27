import {
    SITE_LOADER,
    BULK_FORM,
    BULK_LOADER,
    BULK_RESULT,
    NEW_CITY,
    USERS_LIST,
    USERS_LIST_RESULT,
    CITIES,
    CITY_RESULT,
    STATES,
    STATE_RESULT,
    TENANTS,
    TENANT_RESULT,
    USERS,
    USERS_RESULT,
    PUSH_OPTION
} from '../constants/constants';


/* const allOptions = localStorage.getItem('alloptions')
  ? JSON.parse(localStorage.getItem('alloptions'))
  : {} */

const initialState = {
    site_loader: false,
    bulk_loader: false,
    bulk_form: {},
    bulk_result: {},
    cities_result: {},
    cities: [],
    states_result: {},
    states: [],
    tenants_result: {},
    tenants: []
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
            return { ...state, bulk_form: action.payload, site_loader: true }
        }
        case BULK_RESULT: {
            return { ...state, bulk_result: action.payload, site_loader: false }
        }
        case NEW_CITY: {
            return { ...state, new_city: action.payload }
        }
        case USERS_LIST: {
            return { ...state, users_list: action.payload }
        }
        case USERS_LIST_RESULT: {
            return { ...state, users_list_result: action.payload }
        }
        case USERS: {
            return { ...state, users: action.payload.users, total_users: action.payload.total }
        }
        case USERS_RESULT: {
            return { ...state, users_result: action.payload }
        }
        case CITIES: {
            return { ...state, cities: action.payload.cities, total_city: action.payload.total }
        }
        case CITY_RESULT: {
            return { ...state, cities_result: action.payload }
        }
        case STATES: {
            return { ...state, states: action.payload.states, total_state: action.payload.total }
        }
        case STATE_RESULT: {
            return { ...state, states_result: action.payload }
        }
        case TENANTS: {
            return { ...state, tenants: action.payload.tenants, total_tenant: action.payload.total }
        }
        case TENANT_RESULT: {
            return { ...state, tenants_result: action.payload }
        }
        default:
            return state;
    }
}