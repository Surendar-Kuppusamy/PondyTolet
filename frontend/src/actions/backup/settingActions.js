import axios from 'axios';
import { toast } from 'react-toastify';
import { BULK_LOADER, PUSH_OPTION, BULK_FORM, BULK_RESULT, USERS_LIST, CITIES, CITY_RESULT, STATES, STATE_RESULT, TENANTS, TENANT_RESULT, USERS, USERS_RESULT } from '../constants/constants';
import { BULK_INSERT, CREATE_SINGLE_OPTION, USERS_LIST_API, GET_CITIES, EDIT_CITY, DELETE_CITY, DELETE_BULK_CITY, ENABLE_DISABLE_BULK_CITY, ENABLE_DISABLE_CITY_STATUS, GET_STATES, EDIT_STATE, DELETE_STATE, DELETE_BULK_STATE, ENABLE_DISABLE_BULK_STATE, ENABLE_DISABLE_STATE_STATUS, GET_TENANTS, EDIT_TENANT, DELETE_TENANT, DELETE_BULK_TENANT, ENABLE_DISABLE_BULK_TENANT, ENABLE_DISABLE_TENANT_STATUS, GET_USERS, EDIT_USER, DELETE_USER, DELETE_BULK_USER, ENABLE_DISABLE_BULK_USER, ENABLE_DISABLE_USER_STATUS } from '../constants/Apiconstants';
import { BULK_DATA_INSERT_TYPES } from '../config/globalConstant';

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${(localStorage.getItem("token")? localStorage.getItem("token") : '')}`;
    config.headers['Content-Type'] = 'application/json';
    return config;
}, null, { synchronous: true });

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.message == 'Request failed with status code 401') {
        toast.error("Token expired", {theme: "colored"});
        setTimeout(() => {
            localStorage.removeItem("token");
            window.location.reload();
        }, 2000);
    }
    return Promise.reject(error);
});

export const bulkInsert = (field, bulkValues, state) => async (dispatch, getState) => {
    //const state = getState();
    dispatch({type:BULK_FORM, payload: state});
    let postData = {
        'bulk_data': bulkValues,
        'field': field,
        'field_label': BULK_DATA_INSERT_TYPES[field-1].label
    }
    try {
        const { data } = await axios.post(
            BULK_INSERT,
            postData
        );
        dispatch({type:BULK_RESULT, payload: data});
        /* if(data.status == 'error') {
            toast.error(data.message, {theme: "colored"});
        } else {
            toast.success(data.message, {theme: "colored"});
        } */
    } catch(error) {
        console.log('Catch Error ==>'+error);
        let tempData = { status: 'error', message: 'Something went wrong', 'error': error  };
        dispatch({type:BULK_RESULT, payload: tempData});
    }
}

export const createSingleOption = (field, option, state) => async (dispatch, getState) => {
    dispatch({type:BULK_FORM, payload: state});
    let postData = {
        'option': option,
        'field': field,
        'field_label': BULK_DATA_INSERT_TYPES[field-1].label
    }
    try {
        const { data } = await axios.post(
            CREATE_SINGLE_OPTION,
            postData
        );
        dispatch({type:BULK_RESULT, payload: data});
        /* if(data.status == 'error') {
            toast.error(data.message, {theme: "colored"});
        } else {
            toast.success(data.message, {theme: "colored"});
        } */
    } catch(error) {
        console.log('Catch Error ==>'+error);
        let tempData = { status: 'error', message: 'Something went wrong', 'error': error  };
        dispatch({type:BULK_RESULT, payload: tempData});
    }
}

export const dynamicOptionMerge = (pushValue) => async (dispatch, getState) => {
    dispatch({type:PUSH_OPTION, payload: pushValue});
};

export const resetResult = () => async (dispatch, getState) => {
    dispatch({type:BULK_RESULT, payload: {}});
};

export const createCity = (newCity) => async (dispatch, getState) => {
    const state = getState();
    const { new_city } = state.settingState;
    console.log('New City==>'+new_city);
}

//Start: City List

export const resetCitiesResult = () => async (dispatch, getState) => {
    dispatch({type:CITY_RESULT, payload: {}});
};

export const getCities = (state) => async (dispatch, getState) => {
    let skip = Math.ceil(state.currentPage * state.pageRange);
    console.log('Detail', state.currentPage, skip, state.pageRange);
    let postData = {
        'keyword': state.searchKey,
        'skip': skip,
        'limit': state.pageRange
    }
    try {
        const { data } = await axios.post(
            GET_CITIES,
            postData
        );
        dispatch({type:CITIES, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const editCity = (state) => async (dispatch, getState) => {
    let postData = {
        'city_name': state.city,
        'id': state.cityEditID
    };
    try {
        const { data } = await axios.post(
            EDIT_CITY,
            postData
        );
        dispatch({type: CITY_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const deleteCityByID = (cityID) => async (dispatch, getState) => {
    let postData = {
        'id': cityID
    }
    try {
        const { data } = await axios.post(
            DELETE_CITY,
            postData
        );
        dispatch({type: CITY_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const deleteBulkCity = (state) => async (dispatch, getState) => {
    let postData = {
        'cityIds': state.cityIds
    }
    try {
        const { data } = await axios.post(
            DELETE_BULK_CITY,
            postData
        );
        dispatch({type: CITY_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const bulkStatusChangeCity = (state) => async (dispatch, getState) => {
    let postData = {
        'cityIds': state.cityIds,
        'status': state.enableDisableValue
    }
    try {
        const { data } = await axios.post(
            ENABLE_DISABLE_BULK_CITY,
            postData
        );
        dispatch({type: CITY_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const changeCityStatus = (cityID, status) => async (dispatch, getState) => {
    let postData = {
        'cityId': cityID,
        'status': status
    }
    try {
        const { data } = await axios.post(
            ENABLE_DISABLE_CITY_STATUS,
            postData
        );
        dispatch({type: CITY_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

//End: City List

//Start: States

export const resetStatesResult = () => async (dispatch, getState) => {
    dispatch({type:STATE_RESULT, payload: {}});
};

export const getStates = (state) => async (dispatch, getState) => {
    let skip = Math.ceil(state.currentPage * state.pageRange);
    console.log('Detail', state.currentPage, skip, state.pageRange);
    let postData = {
        'keyword': state.searchKey,
        'skip': skip,
        'limit': state.pageRange
    }
    try {
        const { data } = await axios.post(
            GET_STATES,
            postData
        );
        dispatch({type:STATES, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const editState = (state) => async (dispatch, getState) => {
    let postData = {
        'state_name': state.state,
        'id': state.stateEditID
    };
    try {
        const { data } = await axios.post(
            EDIT_STATE,
            postData
        );
        dispatch({type: STATE_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const deleteStateByID = (stateID) => async (dispatch, getState) => {
    let postData = {
        'id': stateID
    }
    try {
        const { data } = await axios.post(
            DELETE_STATE,
            postData
        );
        dispatch({type: STATE_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const deleteBulkState = (state) => async (dispatch, getState) => {
    let postData = {
        'stateIds': state.stateIds
    }
    try {
        const { data } = await axios.post(
            DELETE_BULK_STATE,
            postData
        );
        dispatch({type: STATE_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const bulkStatusChangeState = (state) => async (dispatch, getState) => {
    let postData = {
        'stateIds': state.stateIds,
        'status': state.enableDisableValue
    }
    try {
        const { data } = await axios.post(
            ENABLE_DISABLE_BULK_STATE,
            postData
        );
        dispatch({type: STATE_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const changeStateStatus = (stateID, status) => async (dispatch, getState) => {
    let postData = {
        'stateId': stateID,
        'status': status
    }
    try {
        const { data } = await axios.post(
            ENABLE_DISABLE_STATE_STATUS,
            postData
        );
        dispatch({type: STATE_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

//End: States

//Start: Tenant List

export const resetTenantsResult = () => async (dispatch, getState) => {
    dispatch({type:TENANT_RESULT, payload: {}});
};

export const getTenants = (state) => async (dispatch, getState) => {
    let skip = Math.ceil(state.currentPage * state.pageRange);
    console.log('Detail', state.currentPage, skip, state.pageRange);
    let postData = {
        'keyword': state.searchKey,
        'skip': skip,
        'limit': state.pageRange
    }
    try {
        const { data } = await axios.post(
            GET_TENANTS,
            postData
        );
        dispatch({type:TENANTS, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const editTenant = (state) => async (dispatch, getState) => {
    let postData = {
        'tenant_type': state.tenant,
        'id': state.tenantEditID
    };
    try {
        const { data } = await axios.post(
            EDIT_TENANT,
            postData
        );
        dispatch({type: TENANT_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const deleteTenantByID = (tenantID) => async (dispatch, getState) => {
    let postData = {
        'id': tenantID
    }
    try {
        const { data } = await axios.post(
            DELETE_TENANT,
            postData
        );
        dispatch({type: TENANT_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const deleteBulkTenant = (state) => async (dispatch, getState) => {
    let postData = {
        'tenantIds': state.tenantIds
    }
    try {
        const { data } = await axios.post(
            DELETE_BULK_TENANT,
            postData
        );
        dispatch({type: TENANT_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const bulkStatusChangeTenant = (state) => async (dispatch, getState) => {
    let postData = {
        'tenantIds': state.tenantIds,
        'status': state.enableDisableValue
    }
    try {
        const { data } = await axios.post(
            ENABLE_DISABLE_BULK_TENANT,
            postData
        );
        dispatch({type: TENANT_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const changeTenantStatus = (tenantID, status) => async (dispatch, getState) => {
    let postData = {
        'tenantId': tenantID,
        'status': status
    }
    try {
        const { data } = await axios.post(
            ENABLE_DISABLE_TENANT_STATUS,
            postData
        );
        dispatch({type: TENANT_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}
//End: Tenant List

//Start: Users List

export const resetUsersResult = () => async (dispatch, getState) => {
    dispatch({type:USERS_RESULT, payload: {}});
};

export const getUsers = (state) => async (dispatch, getState) => {
    let skip = Math.ceil(state.currentPage * state.pageRange);
    console.log('Detail', state.currentPage, skip, state.pageRange);
    let postData = {
        'keyword': state.searchKey,
        'skip': skip,
        'limit': state.pageRange
    }
    try {
        const { data } = await axios.post(
            GET_USERS,
            postData
        );
        dispatch({type:USERS, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const editUser = (state) => async (dispatch, getState) => {
    let postData = {
        'first_name': state.user.first_name,
        'last_name': state.user.last_name,
        'dob': state.user.dob,
        'email': state.user.email,
        'password': state.user.password,
        'mobile_number': state.user.mobile_number,
        'telephone_number': state.user.telephone_number,
        'std_code': state.user.std_code,
        'address': state.user.address,
        'profile_image': state.user.profile_image,
        'user_type': state.user.user_type,
        'user_status': state.user.user_status,
        'id': state.userEditID
    };
    try {
        const { data } = await axios.post(
            EDIT_USER,
            postData
        );
        dispatch({type: USERS_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const deleteUserByID = (userID) => async (dispatch, getState) => {
    let postData = {
        'id': userID
    }
    try {
        const { data } = await axios.post(
            DELETE_USER,
            postData
        );
        dispatch({type: USERS_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

/* export const deleteBulkTenant = (state) => async (dispatch, getState) => {
    let postData = {
        'userIds': state.userIds
    }
    try {
        const { data } = await axios.post(
            DELETE_BULK_USER,
            postData
        );
        dispatch({type: USERS_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
} */

export const bulkStatusChangeUser = (state) => async (dispatch, getState) => {
    let postData = {
        'userIds': state.userIds,
        'status': state.enableDisableValue
    }
    try {
        const { data } = await axios.post(
            ENABLE_DISABLE_BULK_USER,
            postData
        );
        dispatch({type: USERS_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}

export const changeUserStatus = (tenantID, status) => async (dispatch, getState) => {
    let postData = {
        //'userId': userID,
        'status': status
    }
    try {
        const { data } = await axios.post(
            ENABLE_DISABLE_USER_STATUS,
            postData
        );
        dispatch({type: USERS_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
}
//End: Users List

//Start: User List

/* export const getUsers = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.get(
            USERS_LIST_API
        );
        console.log('data', data);
        dispatch({type:USERS_LIST, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
        let tempData = { status: 'error', message: 'Something went wrong', 'error': error  };
        dispatch({type:USERS_LIST, payload: tempData});
    }
} */

//End: User List