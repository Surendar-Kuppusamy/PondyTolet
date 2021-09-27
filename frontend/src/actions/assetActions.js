import { ALL_OPTIONS } from '../constants/constants';
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

export const getAllOptions = () => async (dispatch) => {
    const all_options = {
        days_month_years_options: DAYS_MONTH_YEARS_OPTIONS,
        type_of_asset_options: TYPE_OF_ASSET_OPTIONS,
        asset_for_options: ASSET_FOR_OPTIONS,
        city_options: CITY_OPTIONS,
        state_options: STATE_OPTIONS,
        who_can_contact_options: WHO_CAN_CONTACT_OPTIONS,
        asset_status_now_options: ASSET_STATUS_NOW_OPTIONS,
        show_my_asset_for_tenants_options: SHOW_MY_ASSET_FOR_TENANTS_OPTIONS,
        like_or_dislike_options: LIKE_OR_DISLIKE_OPTIONS,
        is_proposal_cancelled_options: IS_PROPOSAL_CANCELLED_OPTIONS,
        asset_length_width_options: ASSET_LENGTH_WIDTH_OPTIONS
    };
    dispatch({type: ALL_OPTIONS, payload: all_options});
}

export const createAsset = (assetValues) => async (dispatch) => {
    console.log(assetValues);
}