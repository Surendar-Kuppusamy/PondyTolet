import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { parse, isDate } from "date-fns";
import StepWizard from "react-step-wizard";
import { SITE_LOADER, ALL_OPTIONS, SET_WHO_CAN_CONTACT_OPTIONS } from '../../../constants/constants';
import { getAllOptions, createAsset } from '../../../actions/assetActions';
import AssetAddFormWizzardStep1 from './AssetAddFormWizzardStep1';
import AssetAddFormWizzardStep2 from './AssetAddFormWizzardStep2';
import AssetAddFormWizzardStep3 from './AssetAddFormWizzardStep3';
import AssetAddFormWizzardStep4 from './AssetAddFormWizzardStep4';
import AssetAddFormWizzardStep5 from './AssetAddFormWizzardStep5';
import AssetAddFormWizzardStep6 from './AssetAddFormWizzardStep6';
import AssetAddFormWizzardStep7 from './AssetAddFormWizzardStep7';

const onSelectMultipleChange = (value, actionMeta, field, values, setFieldValue) => {
    var loader = field+'_is_loading';
    setFieldValue(loader, true);
    console.log(value, actionMeta);
    let tempValue = [];
    tempValue = values.who_can_contact;
    if(actionMeta.action == "create-option" && actionMeta.option.__isNew__) {
        console.log(actionMeta.option.value);
        //Save and select
        //all_options.who_can_contact_options.unshift({label: actionMeta.option.value, value: actionMeta.option.value});
        setFieldValue(loader, false);
    } else if(actionMeta.action == "select-option") {
        tempValue.push(actionMeta.option.value);
        setFieldValue(field, tempValue);
        setFieldValue(loader, false);
    } else if(actionMeta.action == "remove-value") {
        var removedIndex = tempValue.indexOf(actionMeta.removedValue.value);
        tempValue.splice(removedIndex, 1);
        setFieldValue(field, tempValue);
        setFieldValue(loader, false);
    }
    setFieldValue(loader, false);
};



const onDobDateChange = (e, field, values, setFieldValue) => {
    var asset_available_on_from = e.getFullYear()+'-'+(e.getMonth() + 1)+'-'+e.getDate();
    setFieldValue(field, asset_available_on_from);
};    

const onClickDMYTypes = (e, field, values, setFieldValue) => {
    console.log(e, field, values, setFieldValue);
    setFieldValue(field, e.value);
}

const mapStateToProps = (state) => {
    return {
        assetState: state.assetState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getoptions: () => {
            dispatch(getAllOptions());
        }
    }   
}

function AddAssets(props) {
    /* const dispatch = useDispatch();
    dispatch({type: ALL_OPTIONS, payload: {'te': 'function'}});
    const assetState = useSelector((state) => state.assetState) */

    const customStyles = {
        singleValue: (provided, state) => {
          const color = state.selectProps.isLoading ? 'white' : 'black';
          return { ...provided, color };
        },
        valueContainer: (provided, state) => {
            const color = state.selectProps.isLoading ? 'white' : 'black';
            return { ...provided, color };
          }
    }

    const assetState = useSelector((state) => state.assetState)
    console.log(assetState);
    
    if(Object.keys(props.assetState.alloptions).length == 0) {
        props.getoptions();
        console.log(assetState);
    }

    useEffect(() => {
        
    },[])

    const onSelectChange = (e, field, values, setFieldValue, loader) => {
        var loader = field+'_is_loading';
        setFieldValue(loader, true);
        if(e.__isNew__) {
            //Save and select
            assetState.alloptions.city_options.push({'label': 'Loading', 'value': 0});
            setFieldValue(field, 0);
            setTimeout(function() {
                assetState.alloptions.city_options.unshift({'label': e.value, 'value': e.value});
                setFieldValue(loader, false);
                setFieldValue(field, e.value);
                //setFieldValue(field, 0);
            }, 2000);
        } else {
            setFieldValue(field, e.value);
            setFieldValue(loader, false);
        }
    };
    
    /* const onClickRoomsTypes = (e, field, index, values, setFieldValue) => {
        console.log(values);
        setFieldValue(field, e.value);
    }

    const handleRoomChange = (e, index, field, room, setFieldValue) => {
        setFieldValue(room[field], e.value);
    }; */

    const initialValues = {
        user_id: 0,
        type_of_asset: 1,
        asset_for: 1,
        asset_name: '',
        door_number: 0,
        address_hint:'',
        street: '',
        nagar: '',
        city: 0,
        city_is_loading: false,
        state: 0,
        state_is_loading: false,
        pincode:0,
        landmark: '',
        number_of_rooms: 0,
        bhk: 0,
        age_of_asset: 0,
        age_of_asset_type: 1,
        asset_main_image: [],
        asset_size_in_length_type: 1,
        asset_size_in_length: 0,
        asset_size_in_width_type: 1,
        asset_size_in_width: 0,
        asset_notes_by_owner: '',
        who_can_contact: [],
        who_can_contact_is_loading: false,
        advance_amount_for_asset:0,
        monthly_rent_for_asset: 0,
        lease_amount_for_asset: 0,
        lease_period_for_asset: 0,
        lease_period_for_asset_type: 1,
        asset_price:0,
        asset_available_on_from: '',
        notice_period_for_vocate_asset: 0,
        notice_period_for_vocate_asset_type: 1,
        asset_status_now: 0,
        asset_status_now_is_loading: false,
        show_my_asset_for_tenants: 1,

        rooms: []
    };

    const validationSchema = Yup.object().shape({
        type_of_asset: Yup.number()
            .required('Asset type is required.'),
        asset_for: Yup.number()
            .required('Asset for is required.'),
        asset_name: Yup.string()
            .required('Asset name is required.')
            .min(3, 'Asset name must be minimum 3 characters.')
            .max(50, 'Asset name character must be less than 50 characters.'),
        door_number: Yup.number()
            .when('type_of_asset', {
                is: (type_of_asset, validationSchema) => {
                    if(type_of_asset  != 5 && type_of_asset  != 3 && type_of_asset  != 4) {   //5 => 'Land', 3 => 'Store', 4 => 'Koddon'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Door number is required.').min(1, 'Door number must be valid.')
            }),
        address_hint: Yup.string(),
        street: Yup.string(),
        nagar: Yup.string(),
        city: Yup.number()
            .required('City is required.')
            .min(1, 'City is required.'),
        state: Yup.number()
            .required('State is required.')
            .min(1, 'State is required.'),
        pincode: Yup.number()
            .required('Pincode is required.')
            .min(1, 'Pincode is required.'),
        landmark: Yup.string(),
        number_of_rooms: Yup.number()
            .when('type_of_asset', {
                is: (type_of_asset, validationSchema) => {
                    if(type_of_asset  == 1 || type_of_asset  == 2) {   //1 => 'House', 2 => 'Appartment'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Number of room is required.').min(1, 'Number of room must be valid.').max(20, 'Number of room must be valid.')
            }),
        bhk: Yup.number()
            .when('type_of_asset', {
                is: (type_of_asset, validationSchema) => {
                    if(type_of_asset  == 1 || type_of_asset  == 2) {   //1 => 'House', 2 => 'Appartment'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('BHK is required.').min(1, 'BHK must be valid.').max(20, 'BHK must be valid.')
            }),
        age_of_asset: Yup.number()
            .when('type_of_asset', {
                is: (type_of_asset, validationSchema) => {
                    if(type_of_asset != 5) {  //5 => 'Land'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Age of asset is required.').min(1, 'Age of asset must be valid.').max(50, 'Age of asst must be valid.')
            }),
        age_of_asset_type: Yup.number()
            .when('type_of_asset', {
                is: (type_of_asset, validationSchema) => {
                    if(type_of_asset != 5) {  //5 => 'Land'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Age of asset type is required.')
            }),
        asset_main_image: Yup.array(),
        asset_size_in_length_type: Yup.number(),
        asset_size_in_length: Yup.number(),
        asset_size_in_width_type: Yup.number(),
        asset_size_in_width: Yup.number(),
        asset_notes_by_owner: Yup.string(),
        who_can_contact: Yup.array().min(1, 'Select any one of the tenant type'),
        advance_amount_for_asset: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for == 1) {  //1 => 'Rent'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Asset advance amount is required.').min(100, 'Asset advance amount must be valid.').max(500000, 'Asset advance amount must be valid.')
            }),
        monthly_rent_for_asset: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for == 1) {  //1 => 'Rent'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Asset monthly rent amount is required.').min(100, 'Asset monthly rent amount must be valid.').max(500000, 'Asset monthly rent amount must be valid.')
            }),
        lease_amount_for_asset: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for == 2) { //2 => 'Lease'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Asset lease amount is required.').min(100, 'Asset lease amount must be valid.')
            }),
        lease_period_for_asset: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for == 2) { //2 => 'Lease'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Asset lease period is required.').min(1, 'Asset lease period is required.')
            }),
        lease_period_for_asset_type: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for == 2) { //2 => 'Lease'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Asset lease amount type is required.')
            }),
        asset_price: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for  == 3) {  //3 => 'Sale'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Asset price is required.').min(100, 'Asset price must be valid.')
            }),
        asset_available_on_from: Yup.date().required('Asset available date required.'),
        notice_period_for_vocate_asset: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for == 1) {  //1 => 'Rent'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Notice period to vocate is required.').min(1, 'Notice period to vocate must be valid.').test('notice_period_for_vocate_asset', 'Only numeric allowed.',(value) => Number.isInteger(value))
            }),
        notice_period_for_vocate_asset_type: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for == 1) {  //1 => 'Rent'
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Notice period to vocate type is required.')
            }),
        asset_status_now: Yup.number()
            .required('Asset status is required.')
            .min(1, 'Asset status is required.'),
        show_my_asset_for_tenants: Yup.number()
            .required('Show my asset to tenant status is required.'),
        rooms: Yup.array().of(Yup.object().shape({
            room_name: Yup.string()
                .when('type_of_asset', {
                    is: (type_of_asset, validationSchema) => {
                        if(type_of_asset  == 1 || type_of_asset  == 2) {   //1 => 'House', 2 => 'Appartment'
                            return true;
                        } else {
                            return false;
                        }
                    },
                    then:  Yup.string().required('Room name required.')
                }),
            room_size_in_length: Yup.number()
                .when('type_of_asset', {
                    is: (type_of_asset, validationSchema) => {
                        if(type_of_asset  == 1 || type_of_asset  == 2) {   //1 => 'House', 2 => 'Appartment'
                            return true;
                        } else {
                            return false;
                        }
                    },
                    then:  Yup.number().required('Room length required.')
                }),
            room_size_in_length_type: Yup.string()
                .when('type_of_asset', {
                    is: (type_of_asset, validationSchema) => {
                        if(type_of_asset  == 1 || type_of_asset  == 2) {   //1 => 'House', 2 => 'Appartment'
                            return true;
                        } else {
                            return false;
                        }
                    },
                    then:  Yup.string().required('Room length type required.')
                }),
            room_size_in_width: Yup.number()
                .when('type_of_asset', {
                    is: (type_of_asset, validationSchema) => {
                        if(type_of_asset  == 1 || type_of_asset  == 2) {   //1 => 'House', 2 => 'Appartment'
                            return true;
                        } else {
                            return false;
                        }
                    },
                    then:  Yup.number().required('Room width required.')
                }),
            room_size_in_width_type: Yup.string()
                .when('type_of_asset', {
                    is: (type_of_asset, validationSchema) => {
                        if(type_of_asset  == 1 || type_of_asset  == 2) {   //1 => 'House', 2 => 'Appartment'
                            return true;
                        } else {
                            return false;
                        }
                    },
                    then:  Yup.string().required('Room width type required.')
                })
        }))
    });

    let custom = {
        enterLeft: 'animate__backInUp'
    }

    const onSubmit = (values) => {
        console.log(values);
        props.createAsset(values);
    };

    return (
        <section id="AddAssets">
            <h3>Add Asset</h3>
            <div className="container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, values, field, touched, setTouched, validateField, setFieldTouched, setValues, setFieldValue, handleChange, handleBlur }) => (
                        <Form>
                            <pre>
                                {JSON.stringify(values)}
                            </pre>
                        
                            <StepWizard transitions={custom} onStepChange={() => window.scrollTo(0, 0)}>
                                <AssetAddFormWizzardStep1 formikProps={{ errors, values, field, touched, setTouched, validateField, setFieldTouched, setValues, setFieldValue, handleChange, handleBlur }} all_options={assetState.alloptions} />
                                <AssetAddFormWizzardStep2 formikProps={{ errors, values, field, touched, setTouched, validateField, setFieldTouched, setValues, setFieldValue, handleChange, handleBlur }} all_options={assetState.alloptions} customStyles={customStyles} onSelectChange={onSelectChange} onSelectMultipleChange={onSelectMultipleChange} />
                                { (values.type_of_asset == 2 || values.type_of_asset == 1)/* 2 => 'Appartment', 1 => 'House' */ &&
                                    <AssetAddFormWizzardStep3 formikProps={{ errors, values, field, touched, setTouched, validateField, setFieldTouched, setValues, setFieldValue, handleChange, handleBlur }} all_options={assetState.alloptions} onClickDMYTypes={onClickDMYTypes} />
                                }
                                <AssetAddFormWizzardStep4 formikProps={{ errors, values, field, touched, setTouched, validateField, setFieldTouched, setValues, setFieldValue, handleChange, handleBlur }} all_options={assetState.alloptions} onClickDMYTypes={onClickDMYTypes} />
                                <AssetAddFormWizzardStep5 formikProps={{ errors, values, field, touched, setTouched, validateField, setFieldTouched, setValues, setFieldValue, handleChange, handleBlur }} all_options={assetState.alloptions} customStyles={customStyles} onSelectChange={onSelectChange} onSelectMultipleChange={onSelectMultipleChange} onClickDMYTypes={onClickDMYTypes} />
                                <AssetAddFormWizzardStep6 formikProps={{ errors, values, field, touched, setTouched, validateField, setFieldTouched, setValues, setFieldValue, handleChange, handleBlur }} all_options={assetState.alloptions} customStyles={customStyles} onSelectChange={onSelectChange} onSelectMultipleChange={onSelectMultipleChange} onClickDMYTypes={onClickDMYTypes} onDobDateChange={onDobDateChange} />
                                { (values.type_of_asset == 2 || values.type_of_asset == 1)/* 2 => 'Appartment', 1 => 'House' */ &&
                                    <AssetAddFormWizzardStep7 formikProps={{ errors, values, field, touched, setTouched, validateField, setFieldTouched, setValues, setFieldValue, handleChange, handleBlur }} all_options={assetState.alloptions} customStyles={customStyles} onSelectChange={onSelectChange} onSelectMultipleChange={onSelectMultipleChange} onClickDMYTypes={onClickDMYTypes} onDobDateChange={onDobDateChange} />
                                }
                            </StepWizard>
                            <div className="mb-2 mt-2">
                                <button className="btn btn-primary" type="submit">
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAssets);