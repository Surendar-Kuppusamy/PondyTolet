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
    ALL_OPTIONS
} from '../constants/constants'


export const getAllOptions = () => async (dispatch) => {

    const days_month_years_options = [
        { value: 1, label: 'Day(s)' },
        { value: 2, label: 'Month(s)' },
        { value: 3, label: 'Year(s)' }
    ];
    
    const type_of_asset_options = [
        { key: 1, value: 'House', label: 'House' },
        { key: 2, value: 'Appartment', label: 'Appartment' },
        { key: 3, value: 'Store', label: 'Store' },
        { key: 4, value: 'Koddon', label: 'Koddon' },
        { key: 5, value: 'Land', label: 'Land' }
    ];

    const asset_length_width_options = [
        { key: 1, value: 'sq.ft.', label: 'sq.ft.' },
        { key: 2, value: 'sq.yards', label: 'sq.yards' },
        { key: 3, value: 'sq.m.', label: 'sq.m.' },
        { key: 4, value: 'grounds', label: 'grounds' },
        { key: 5, value: 'aankadam', label: 'aankadam' },
        { key: 6, value: 'rood', label: 'rood' },
        { key: 7, value: 'chataks', label: 'chataks' },
        { key: 8, value: 'perch', label: 'perch' },
        { key: 9, value: 'guntha', label: 'guntha' },
        { key: 10, value: 'ares', label: 'ares' },
        { key: 11, value: 'biswa', label: 'biswa' },
        { key: 12, value: 'acres', label: 'acres' },
        { key: 13, value: 'bigha', label: 'bigha' },
        { key: 14, value: 'kottah', label: 'kottah' },
        { key: 15, value: 'hectares', label: 'hectares' },
        { key: 16, value: 'marla', label: 'marla' },
        { key: 17, value: 'kanal', label: 'kanal' },
        { key: 18, value: 'cents', label: 'cents' }
    ];

    const show_my_asset_for_tenants_options = [
        { key: 1, value: 'Show', label: 'Show' },
        { key: 2, value: 'Hide', label: 'Hide' }
    ];

    const asset_for_options = [
        { key: 1, value: 'Rent', label: 'Rent' },
        { key: 2, value: 'Lease', label: 'Lease' },
        { key: 3, value: 'Sale', label: 'Sale' }
    ];

    const city_options = [
        { value: 1, label: 'Muthialpet' },
        { value: 2, label: 'Mudaliyarpet' },
        { value: 3, label: 'Villianur' },
        { value: 4, label: 'yanam' }
    ];

    const state_options = [
        { value: 1, label: 'Puducherry' },
        { value: 2, label: 'Tamilnadu' }
    ];

    const who_can_contact_options = [
        { value: 1, label: 'Bachelor' },
        { value: 2, label: 'Single Person' },
        { value: 3, label: 'Family' },
        { value: 4, label: 'Anyone' }
    ];

    const asset_status_now_options = [
        { value: 1, label: 'Free(available)' },
        { value: 2, label: 'Booked(unavailable)' },
        { value: 3, label: 'Tenant on notice period' },
        { value: 4, label: 'Asset under maintenance' }
    ];



    const like_or_dislike_options = [
        { value: 'Like', label: 'Like' },
        { value: 'Dislike', label: 'Dislike' }
    ];

    const is_proposal_cancelled_options = [
        { value: 'Not Cancelled', label: 'Not Cancelled' },
        { value: 'Cancelled', label: 'Cancelled' }
    ];
    


    const all_options = {
        days_month_years_options: days_month_years_options,
        type_of_asset_options: type_of_asset_options,
        asset_for_options: asset_for_options,
        city_options: city_options,
        state_options: state_options,
        who_can_contact_options: who_can_contact_options,
        asset_status_now_options: asset_status_now_options,
        show_my_asset_for_tenants_options: show_my_asset_for_tenants_options,
        like_or_dislike_options: like_or_dislike_options,
        is_proposal_cancelled_options: is_proposal_cancelled_options,
        asset_length_width_options: asset_length_width_options
    };
    
    try{       
        console.log('options =====>');
        dispatch({type: ALL_OPTIONS, payload: all_options});
    } catch(error) {
        console.log('Error=>'+error)
    }
}

export const createAsset = (assetValues) => async (dispatch) => {
    console.log(assetValues);
}