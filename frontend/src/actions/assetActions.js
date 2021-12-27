import axios from 'axios';
import { ALL_OPTIONS, ASSET_LOADER, ASSET_RESULT } from '../constants/constants';
import {
    DAYS_MONTH_YEARS_OPTIONS,
    TYPE_OF_ASSET_OPTIONS,
    ASSET_LENGTH_WIDTH_OPTIONS,
    SHOW_MY_ASSET_FOR_TENANTS_OPTIONS,
    ASSET_FOR_OPTIONS,
    CITY_OPTIONS,
    STATE_OPTIONS,
    WHO_CAN_CONTACT_OPTIONS,
    ASSET_STATUS_NOW_OPTIONS,
    LIKE_OR_DISLIKE_OPTIONS,
    IS_PROPOSAL_CANCELLED_OPTIONS
} from '../config/globalConstant';
import { ASSET_CREATE, GET_OPTIONS } from '../constants/Apiconstants';

export const getAllOptions = () => async (dispatch) => {
    const all_options = {
        days_month_years_options: DAYS_MONTH_YEARS_OPTIONS,
        type_of_asset_options: TYPE_OF_ASSET_OPTIONS,
        asset_for_options: ASSET_FOR_OPTIONS,
        /* city_options: CITY_OPTIONS,
        state_options: STATE_OPTIONS,
        who_can_contact_options: WHO_CAN_CONTACT_OPTIONS, */
        asset_status_now_options: ASSET_STATUS_NOW_OPTIONS,
        show_my_asset_for_tenants_options: SHOW_MY_ASSET_FOR_TENANTS_OPTIONS,
        like_or_dislike_options: LIKE_OR_DISLIKE_OPTIONS,
        is_proposal_cancelled_options: IS_PROPOSAL_CANCELLED_OPTIONS,
        asset_length_width_options: ASSET_LENGTH_WIDTH_OPTIONS
    };

    let city_state_tenant_options;
    try {
        const { data } = await axios.get(
            GET_OPTIONS
        );
        city_state_tenant_options = data.data;
        all_options[city_state_tenant_options[0]._id] = city_state_tenant_options[0].options;
        all_options[city_state_tenant_options[1]._id] = city_state_tenant_options[1].options;
        all_options[city_state_tenant_options[2]._id] = city_state_tenant_options[2].options;
        dispatch({type: ALL_OPTIONS, payload: all_options});
    } catch(error) {
        console.log('Catch Error ==>'+error);
    }
    //console.log('final', all_options);

    
}

export const createAsset = (assetValues) => async (dispatch, getState) => {
    const state = getState();
    const { asset_form } =  state.assetState;
    console.log('Actions ===>'+JSON.stringify(asset_form));
    try {
        const { data } = await axios.post(
            ASSET_CREATE,
            asset_form
        );
        dispatch({type:ASSET_RESULT, payload: data});
    } catch(error) {
        console.log('Catch Error ==>'+error);
        let tempData = { status: 'error', message: 'Something went wrong', 'error': error  };
        dispatch({type:ASSET_RESULT, payload: tempData});
    }
    
    dispatch({
        type: ASSET_LOADER
    });
}