export const HOST = 'http://localhost:3001/';
export const USERSIGNUP = HOST+'api/user/signup';
export const USER_LOGIN = HOST+'api/user/login';
export const ASSET_CREATE = HOST+'api/asset/add';

export const BULK_INSERT = HOST+'api/setting/bulk/add';   //Bulk add [city, states, tenants]
export const USERS_LIST_API = HOST+'api/setting/users/list';    //User list
export const GET_OPTIONS = HOST+'api/setting/get/options';  //Get options['city', 'state', 'tenant']
export const CREATE_SINGLE_OPTION = HOST+'api/setting/create/single/option';    //Create single option of [city, states, tenants]

//Start: City List
export const GET_CITIES = HOST+'api/setting/get/cities';
export const EDIT_CITY = HOST+'api/setting/edit/city';
export const DELETE_CITY = HOST+'api/setting/delete/city';
export const DELETE_BULK_CITY = HOST+'api/setting/delete/bulk/city';
export const ENABLE_DISABLE_BULK_CITY = HOST+'api/setting/bulk/status/change/city';
export const ENABLE_DISABLE_CITY_STATUS = HOST+'api/setting/change/city/status';
//End: City List

//Start: State List
export const GET_STATES = HOST+'api/setting/get/states';
export const EDIT_STATE = HOST+'api/setting/edit/state';
export const DELETE_STATE = HOST+'api/setting/delete/state';
export const DELETE_BULK_STATE = HOST+'api/setting/delete/bulk/state';
export const ENABLE_DISABLE_BULK_STATE = HOST+'api/setting/bulk/status/change/state';
export const ENABLE_DISABLE_STATE_STATUS = HOST+'api/setting/change/state/status';
//End: State List

//Start: Tenant List
export const GET_TENANTS = HOST+'api/setting/get/tenants';
export const EDIT_TENANT = HOST+'api/setting/edit/tenant';
export const DELETE_TENANT = HOST+'api/setting/delete/tenant';
export const DELETE_BULK_TENANT = HOST+'api/setting/delete/bulk/tenant';
export const ENABLE_DISABLE_BULK_TENANT = HOST+'api/setting/bulk/status/change/tenant';
export const ENABLE_DISABLE_TENANT_STATUS = HOST+'api/setting/change/tenant/status';
//End: Tenant List

//Start: Users List
export const GET_USERS = HOST+'api/setting/get/users';
export const EDIT_USER = HOST+'api/setting/edit/user';
export const DELETE_USER = HOST+'api/setting/delete/user';
export const DELETE_BULK_USER = HOST+'api/setting/delete/bulk/user';
export const ENABLE_DISABLE_BULK_USER = HOST+'api/setting/bulk/status/change/user';
export const ENABLE_DISABLE_USER_STATUS = HOST+'api/setting/change/user/status';
//End: Users List