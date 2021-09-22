import { SET_WHO_CAN_CONTACT_OPTIONS, SET_SITE_LOADER, SITE_LOADER, ALL_OPTIONS, TYPE_OF_ASSET_OPTIONS, ASSET_FOR_OPTIONS, WHO_CAN_CONTACT_OPTIONS, ASSET_STATUS_NOW_OPTIONS, SHOW_MY_ASSET_FOR_TENANTS_OPTIONS, LIKE_OR_DISLIKE_OPTIONS, IS_PROPOSAL_CANCELLED_OPTIONS,  ASSET_LENGTH_WIDTH_OPTIONS } from '../actions/constants';


  const days_month_years_options = [
    { value: 'Day(s)', label: 'Day(s)' },
    { value: 'Month(s)', label: 'Month(s)' },
    { value: 'Year(s)', label: 'Year(s)' }
  ];  

  const type_of_asset_options = [
    { value: 'House', label: 'House' },
    { value: 'Appartment', label: 'Appartment' },
    { value: 'Store', label: 'Store' },
    { value: 'Koddon', label: 'Koddon' },
    { value: 'Land', label: 'Land' }
  ];

  const asset_for_options = [
    { value: 'Rent', label: 'Rent' },
    { value: 'Lease', label: 'Lease' },
    { value: 'Sale', label: 'Sale' }
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

  const show_my_asset_for_tenants_options = [
    { value: 'Show', label: 'Show' },
    { value: 'Hide', label: 'Hide' }
  ];

  const like_or_dislike_options = [
    { value: 'Like', label: 'Like' },
    { value: 'Dislike', label: 'Dislike' }
  ];

  const is_proposal_cancelled_options = [
    { value: 'Not Cancelled', label: 'Not Cancelled' },
    { value: 'Cancelled', label: 'Cancelled' }
  ];

  const asset_length_width_options = [
    { value: 'sq.ft.', label: 'sq.ft.' },
    { value: 'sq.yards', label: 'sq.yards' },
    { value: 'sq.m.', label: 'sq.m.' },
    { value: 'grounds', label: 'grounds' },
    { value: 'aankadam', label: 'aankadam' },
    { value: 'rood', label: 'rood' },
    { value: 'chataks', label: 'chataks' },
    { value: 'perch', label: 'perch' },
    { value: 'guntha', label: 'guntha' },
    { value: 'ares', label: 'ares' },
    { value: 'biswa', label: 'biswa' },
    { value: 'acres', label: 'acres' },
    { value: 'bigha', label: 'bigha' },
    { value: 'kottah', label: 'kottah' },
    { value: 'hectares', label: 'hectares' },
    { value: 'marla', label: 'marla' },
    { value: 'kanal', label: 'kanal' },
    { value: 'cents', label: 'cents' }
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

  const initialState = {
    value: 0,
    is_site_loaded: false,
    site_loader: false,
    all_options:all_options
  };

function defaultReducers(state = initialState, action) {
    switch (action.type) {
      case SITE_LOADER: {
        return state.site_loader
      }
      case SET_SITE_LOADER: {
        return { ...state, site_loader: action.payload }
      }
      case TYPE_OF_ASSET_OPTIONS: {
        return { ...state, type_of_asset_options: type_of_asset_options }
      }
      case ASSET_FOR_OPTIONS: {
        return { ...state, asset_for_options: asset_for_options }
      }
      case WHO_CAN_CONTACT_OPTIONS: {
        return { ...state, who_can_contact_options: who_can_contact_options }
      }
      case SET_WHO_CAN_CONTACT_OPTIONS: {
        who_can_contact_options.push(action.payload);
        all_options[who_can_contact_options] = who_can_contact_options;
        return { ...state, all_options: all_options }
      }
      case ASSET_STATUS_NOW_OPTIONS: {
        return { ...state, asset_status_now_options: asset_status_now_options }
      }
      case SHOW_MY_ASSET_FOR_TENANTS_OPTIONS: {
        return { ...state, show_my_asset_for_tenants_options: show_my_asset_for_tenants_options }
      }
      case LIKE_OR_DISLIKE_OPTIONS: {
        return { ...state, like_or_dislike_options: like_or_dislike_options }
      }
      case IS_PROPOSAL_CANCELLED_OPTIONS: {
        return { ...state, is_proposal_cancelled_options: is_proposal_cancelled_options }
      }
      case ASSET_LENGTH_WIDTH_OPTIONS: {
        return { ...state, asset_length_width_options: asset_length_width_options }
      }
      case ALL_OPTIONS: {
        console.log(action);
        return { ...state, all_options: all_options }
      }
      default:
        return state
    }
};
export default defaultReducers;
