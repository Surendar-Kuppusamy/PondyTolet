import axios from 'axios';
import { BULK_LOADER, BULK_FORM, BULK_RESULT } from '../constants/constants';
import { BULK_INSERT } from '../constants/Apiconstants';

export const bulkInsert = (bulkValues) => async (dispatch, getState) => {
    const state = getState();
    const { bulk_form } =  state.settingState;
    console.log(bulk_form);
    /* const state = getState();
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
    }); */
}

export const createCity = (newCity) => async (dispatch, getState) => {
    const state = getState();
    const { new_city } = state.settingState;
    console.log('New City==>'+new_city);
}