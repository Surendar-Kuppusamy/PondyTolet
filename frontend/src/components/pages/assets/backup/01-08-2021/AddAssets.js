import React, { useEffect, useState } from 'react';
import { Formik, Form, FieldArray, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { parse, isDate } from "date-fns";
import { useSelector, useDispatch }  from 'react-redux';
import { SITE_LOADER, ALL_OPTIONS, SET_WHO_CAN_CONTACT_OPTIONS } from '../../../actions/constants';

const LoadingIndicator = props => {
    return (
      <div content={'Custom Loader'} className="select-loader">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
            <span className="visually-hidden"> Loading...</span>
        </div>
        <span>  Loading...</span>
      </div>
    );
};

function AddAssets(props) {

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

    const dispatch = useDispatch();
    const all_options = useSelector((state) => state.defaultReducers.all_options);
    const onSelectChange = (e, field, values, setFieldValue, loader) => {
        var loader = field+'_is_loading';
        setFieldValue(loader, true);
        if(e.__isNew__) {
            //Save and select
            all_options.city_options.push({'label': 'Loading', 'value': 0});
            setFieldValue(field, 0);
            setTimeout(function() {
                all_options.city_options.unshift({'label': e.value, 'value': e.value});
                setFieldValue(loader, false);
                setFieldValue(field, e.value);
                //setFieldValue(field, 0);
            }, 2000);
        } else {
            setFieldValue(field, e.value);
            setFieldValue(loader, false);
        }
    };

    const onSelectMultipleChange = (value, actionMeta, field, values, setFieldValue) => {
        var loader = field+'_is_loading';
        setFieldValue(loader, true);
        if(actionMeta.action == "create-option" && actionMeta.option.__isNew__) {
            console.log(actionMeta.option.value);
            //Save and select
            all_options.who_can_contact_options.unshift({label: actionMeta.option.value, value: actionMeta.option.value});
            setFieldValue(loader, false);
        } else if(actionMeta.action == "select-option") {
            console.log(actionMeta.option.value);
            setFieldValue(loader, false);
        }
    };
    
    const onDobDateChange = (e, field, values, setFieldValue) => {
        var asset_available_on_from = e.getFullYear()+'-'+(e.getMonth() + 1)+'-'+e.getDate();
        setFieldValue(field, asset_available_on_from);
    };    
    
    const onClickDMYTypes = (e, field, values, setFieldValue) => {
        setFieldValue(field, e.value);
    }

    
    const onClickRoomsTypes = (e, field, index, values, setFieldValue) => {
        console.log(values);
        setFieldValue(field, e.value);
    }

    const handleRoomChange = (e, index, field, room, setFieldValue) => {
        setFieldValue(room[field], e.value);
    };

    const initialValues = {
        user_id: 0,
        type_of_asset: 'House',
        asset_for: 'Rent',
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
        age_of_asset_type: 'Day(s)',
        asset_main_image: null,
        asset_size_in_length_type: 'sq.ft.',
        asset_size_in_length: 0,
        asset_size_in_width_type: 'sq.ft.',
        asset_size_in_width: 0,
        asset_notes_by_owner: '',
        who_can_contact: [],
        who_can_contact_is_loading: false,
        advance_amount_for_asset:0,
        monthly_rent_for_asset: 0,
        lease_amount_for_asset: 0,
        lease_period_for_asset: 0,
        lease_period_for_asset_type: 'Day(s)',
        asset_price:0,
        asset_available_on_from: '',
        notice_period_for_vocate_asset: 0,
        notice_period_for_vocate_asset_type: 'Day(s)',
        asset_status_now: 0,
        asset_status_now_is_loading: false,
        show_my_asset_for_tenants: 'Show',

        rooms: []
    };

    const validationSchema = Yup.object().shape({
        type_of_asset: Yup.string()
            .required('Asset type is required.'),
        asset_for: Yup.string()
            .required('Asset for is required.'),
        asset_name: Yup.string()
            .required('Asset name is required.')
            .min(3, 'Asset name must be minimum 3 characters.')
            .max(50, 'Asset name character must be less than 50 characters.'),
        door_number: Yup.number()
            .when('type_of_asset', {
                is: (type_of_asset, validationSchema) => {
                    if(type_of_asset  != 'Land') {
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
                    if(type_of_asset  == 'House' || type_of_asset  == 'Appartment') {
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
                    if(type_of_asset  == 'House' || type_of_asset  == 'Appartment') {
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
                    if(type_of_asset  != 'Land') {
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Age of asset is required.').min(1, 'Age of asset must be valid.').max(50, 'Age of asst must be valid.')
            }),
        age_of_asset_type: Yup.string()
            .when('type_of_asset', {
                is: (type_of_asset, validationSchema) => {
                    if(type_of_asset  != 'Land') {
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.string().required('Age of asset type is required.')
            }),
        asset_main_image: Yup.mixed(),
        asset_size_in_length_type: Yup.string(),
        asset_size_in_length: Yup.number(),
        asset_size_in_width_type: Yup.string(),
        asset_size_in_width: Yup.number(),
        asset_notes_by_owner: Yup.string(),
        who_can_contact: Yup.array().min(1, 'Select any one of the tenant type'),
        advance_amount_for_asset: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for  == 'Rent') {
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
                    if(asset_for  == 'Rent') {
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
                    if(asset_for  == 'Lease') {
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
                    if(asset_for  == 'Lease') {
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Asset lease period is required.').min(1, 'Asset lease period is required.')
            }),
        lease_period_for_asset_type: Yup.string()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for  == 'Lease') {
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.string().required('Asset lease amount type is required.')
            }),
        asset_price: Yup.number()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for  == 'Sale') {
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
                    if(asset_for  == 'Rent') {
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.number().required('Notice period to vocate is required.').min(1, 'Notice period to vocate must be valid.')
            }),
        notice_period_for_vocate_asset_type: Yup.string()
            .when('asset_for', {
                is: (asset_for, validationSchema) => {
                    if(asset_for  == 'Rent') {
                        return true;
                    } else {
                        return false;
                    }
                },
                then: Yup.string().required('Notice period to vocate type is required.')
            }),
        asset_status_now: Yup.number()
            .required('Asset status is required.')
            .min(1, 'Asset status is required.'),
        show_my_asset_for_tenants: Yup.string()
            .required('Show my asset to tenant status is required.')
    });
    

    const onSubmit = (values) => {
        console.log(values);
    };


    return (
        <section id="AddAssets">
            <h3>Add Asset</h3>
            <div className="container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, values, field, touched, setValues, setFieldValue, handleChange, handleBlur }) => (
                        <Form>
                            <pre>
                                {JSON.stringify(values)}
                            </pre>

                            <FieldArray
                                name="arrayOfAssetTypes"
                                render={arrayHelpers => (
                                    <div className="my-2">
                                        <div className="mb-2">
                                            Asset/Property Type:
                                        </div>
                                        {all_options.type_of_asset_options.map((type, index) =>
                                            (
                                                <div className="form-check form-check-inline"  key={index}>
                                                    <input className="form-check-input" type="radio" name="type_of_asset" id={'type_of_asset_'+index} value={type.value} onChange={handleChange} onBlur={handleBlur} checked={values.type_of_asset == type.value } />
                                                    <label className="form-check-label" htmlFor={'type_of_asset_'+index}>{type.label}</label>
                                                </div>
                                            )
                                        )}
                                        <br/>
                                        <ErrorMessage name="type_of_asset" component="span" className="text-danger" />
                                    </div>
                                )}
                            />

                            <FieldArray
                                name="arrayOfAssetFor"
                                render={arrayHelpers => (
                                    <div className="my-2">
                                        <div className="mb-2">
                                            Asset/Property For:
                                        </div>
                                        {all_options.asset_for_options.map((type, index) =>
                                            (
                                                <div className="form-check form-check-inline"  key={index}>
                                                    <input className="form-check-input" type="radio" name="asset_for" id={'asset_for_options_'+index} value={type.value} onChange={handleChange} onBlur={handleBlur} checked={values.asset_for == type.value } />
                                                    <label className="form-check-label" htmlFor={'asset_for_options_'+index}>{type.label}</label>
                                                </div>
                                            )
                                        )}
                                        <br/>
                                        <ErrorMessage name="asset_for" component="span" className="text-danger" />
                                    </div>
                                )}
                            />

                            <div className="mb-3">
                                <label htmlFor="asset_name" className="form-label">Asset Name:</label>
                                <input type="text" className={'form-control' + (errors.asset_name && touched.asset_name ? ' is-invalid' : '')} id="asset_name" name="asset_name" placeholder="Enter your last name" onChange={handleChange} onBlur={handleBlur} value={values.asset_name} />
                                <ErrorMessage name="asset_name" component="span" className="text-danger" />
                            </div>

                            <div>
                                <h4>
                                    {props.asset_type}
                                </h4>
                                <div className="my-2">
                                    Address
                                </div>
                                { values.type_of_asset != 'Land' && (
                                        <div>
                                            <div className="my-2">
                                                Door No.
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text" id="door_numbers">No.</span>
                                                <input type="number" className="form-control max-wid-5" placeholder="Enter door number" min="0" id="door_number"  name="door_number" aria-label="Door Number" aria-describedby="door_numbers" onChange={handleChange} onBlur={handleBlur} value={values.door_number} />
                                                <input type="text" className={'form-control ml-3' + (errors.address_hint && touched.address_hint ? ' is-invalid' : '')} id="address_hint" name="address_hint" placeholder="" onChange={handleChange} onBlur={handleBlur} value={values.address_hint} />
                                            </div>
                                            <div className="mt-n2 mb-3">
                                                <ErrorMessage name="door_number" component="span" className="text-danger" />
                                                <ErrorMessage name="address_hint" component="span" className="text-danger" />
                                            </div>
                                        </div>
                                    )
                                }
                                { values.type_of_asset == 'Land' && (
                                        <div className="mb-3">
                                            <label htmlFor="address_hint">Hint</label>
                                            <input type="text" className={'form-control' + (errors.address_hint && touched.address_hint ? ' is-invalid' : '')} id="address_hint" name="address_hint" placeholder="" onChange={handleChange} onBlur={handleBlur} value={values.address_hint} />
                                            <ErrorMessage name="address_hint" component="span" className="text-danger" />
                                        </div>                                        
                                    )
                                }

                                <div className="mb-3">
                                    <label htmlFor="street" className="form-label">Street:</label>
                                    <input type="text" className={'form-control' + (errors.street && touched.street ? ' is-invalid' : '')} id="street" name="street" placeholder="Enter street" onChange={handleChange} onBlur={handleBlur} value={values.street} />
                                    <ErrorMessage name="street" component="span" className="text-danger" />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="nagar" className="form-label">Nagar:</label>
                                    <input type="text" className={'form-control' + (errors.nagar && touched.nagar ? ' is-invalid' : '')} id="nagar" name="nagar" placeholder="Enter nagar" onChange={handleChange} onBlur={handleBlur} value={values.nagar} />
                                    <ErrorMessage name="nagar" component="span" className="text-danger" />
                                </div>
                                
                                <div className="my-2">
                                    <div className="my-2">
                                        City:
                                    </div>
                                    <CreatableSelect isLoading={values.city_is_loading} formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="city" name="city" options={all_options.city_options} onChange={e => onSelectChange(e, 'city', values, setFieldValue)} defaultValue={values.city} components={{LoadingIndicator}} styles={customStyles} />
                                    <ErrorMessage name="city" component="span" className="text-danger" />
                                </div>
                                
                                <div className="my-2">
                                    <div className="my-2">
                                        State:
                                    </div>
                                    <CreatableSelect isLoading={values.state_is_loading} formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="state" name="state" options={all_options.state_options} onChange={e => onSelectChange(e, 'state', values, setFieldValue)} defaultValue={values.state} components={{LoadingIndicator}} styles={customStyles} />
                                    <ErrorMessage name="state" component="span" className="text-danger" />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="pincode" className="form-label">Pincode:</label>
                                    <input type="number" className={'form-control' + (errors.pincode && touched.pincode ? ' is-invalid' : '')} min="0" id="pincode" name="pincode" placeholder="Enter pincode" onChange={handleChange} onBlur={handleBlur} value={values.pincode} />
                                    <ErrorMessage name="pincode" component="span" className="text-danger" />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="landmark" className="form-label">Landmark</label>
                                    <textarea className="form-control" id="landmark" name="landmark" rows="3"  onChange={handleChange} onBlur={handleBlur} value={values.landmark}></textarea>
                                    <ErrorMessage name="landmark" component="span" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="number_of_rooms" className="form-label">Number of rooms:</label>
                                    <input type="number" className={'form-control' + (errors.number_of_rooms && touched.number_of_rooms ? ' is-invalid' : '')} min="0" id="number_of_rooms" name="number_of_rooms" placeholder="Enter number of rooms" onChange={handleChange} onBlur={handleBlur} value={values.number_of_rooms} />
                                    <ErrorMessage name="number_of_rooms" component="span" className="text-danger" />
                                </div>

                                <div className="mb-2">
                                    BHK
                                </div>
                                <div className="input-group">
                                    <input type="number" className={'form-control' + (errors.bhk && touched.bhk ? ' is-invalid' : '')} id="bhk" name="bhk" placeholder="BHK" aria-label="BHK" aria-describedby="bhks" min="0" placeholder="Enter BHK" onChange={handleChange} onBlur={handleBlur} value={values.bhk} />
                                    <span className="input-group-text" id="bhks">BHK</span>
                                </div>
                                <div className="mt-n2 mb-3">
                                    <ErrorMessage name="bhk" component="span" className="text-danger" />
                                </div>
                                

                                <div className="mb-2">
                                    Age of Asset:
                                </div>
                                <div className="input-group">    
                                    <input type="number" className={'form-control' + (errors.age_of_asset && touched.age_of_asset ? ' is-invalid' : '')} aria-label="Asset age" min="0" name="age_of_asset" id="age_of_asset" placeholder="Enter asset age" onChange={handleChange} onBlur={handleBlur} value={values.age_of_asset} />
                                    <Dropdown options={all_options.days_month_years_options} onChange={e => onClickDMYTypes(e, 'age_of_asset_type', values, setFieldValue)} value={values.age_of_asset_type} placeholder="Select period type" />
                                </div>
                                <div className="mt-n2 mb-3">
                                    <ErrorMessage name="age_of_asset" component="span" className="text-danger" />
                                    <span> </span>
                                    <ErrorMessage name="age_of_asset_type" component="span" className="text-danger" />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="asset_main_image" className="form-label">Asset Image</label>
                                    <input id="asset_main_image" name="asset_main_image" type="file" onChange={(event) => { setFieldValue("asset_main_image", event.currentTarget.files[0]); }} className="form-control" />
                                    <ErrorMessage name="asset_main_image" component="span" className="text-danger" />
                                </div>
                                
                                <div className="mb-2">
                                    Asset width:
                                </div>
                                <div className="input-group mb-3">
                                    <input type="number" className={'form-control' + (errors.asset_size_in_width && touched.asset_size_in_width ? ' is-invalid' : '')} aria-label="Asset width" name="asset_size_in_width" id="asset_size_in_width" min="0" placeholder="Enter asset width" onChange={handleChange} onBlur={handleBlur} value={values.asset_size_in_width} />
                                    <Dropdown options={all_options.asset_length_width_options} onChange={e => onClickDMYTypes(e, 'asset_size_in_width_type', values, setFieldValue)} value={values.asset_size_in_width_type} placeholder="Select unit" />
                                    <ErrorMessage name="asset_size_in_width" component="span" className="text-danger" />
                                    <ErrorMessage name="asset_size_in_width_type" component="span" className="text-danger" />
                                </div>
                                
                                <div className="mb-2">
                                    Asset Length:
                                </div>
                                <div className="input-group mb-3">
                                    <input type="number" className={'form-control' + (errors.asset_size_in_length && touched.asset_size_in_length ? ' is-invalid' : '')} aria-label="Asset length" name="asset_size_in_length" id="asset_size_in_length" min="0" placeholder="Enter asset length" onChange={handleChange} onBlur={handleBlur} value={values.asset_size_in_length} />
                                    <Dropdown options={all_options.asset_length_width_options} onChange={e => onClickDMYTypes(e, 'asset_size_in_length_type', values, setFieldValue)} value={values.asset_size_in_length_type} placeholder="Select unit" />
                                    <ErrorMessage name="asset_size_in_length" component="span" className="text-danger" />
                                    <ErrorMessage name="asset_size_in_length_type" component="span" className="text-danger" />
                                </div>
                                
                                <div className="mb-3">
                                    <label htmlFor="asset_notes_by_owner" className="form-label">Notes or hints about asset:</label>
                                    <textarea className="form-control" id="asset_notes_by_owner" name="asset_notes_by_owner" rows="3"  onChange={handleChange} onBlur={handleBlur} value={values.asset_notes_by_owner}></textarea>
                                    <ErrorMessage name="asset_notes_by_owner" component="span" className="text-danger" />
                                </div>
                                
                                <div className="my-2">
                                    <div className="my-2">
                                        Who can contacts you:
                                    </div>
                                    <CreatableSelect isLoading={values.who_can_contact_is_loading} isMulti formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} createOptionPosition="first" className="basic-single" classNamePrefix="select" id="who_can_contact" name="who_can_contact" options={all_options.who_can_contact_options} createOptionPosition={"first"} onChange={(value, actionMeta) => onSelectMultipleChange(value, actionMeta, 'who_can_contact', values, setFieldValue)} defaultValue={values.who_can_contact} components={{LoadingIndicator}} styles={customStyles} />
                                    <ErrorMessage name="who_can_contact" component="span" className="text-danger" />
                                </div>
                                { values.asset_for == 'Rent' &&
                                    (
                                        <div>
                                            <div className="mb-2">
                                                Advance Amount:
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text" id="asset_amount_rupees">Rs.</span>
                                                <input type="number" aria-label="Advance Amount for Asset" aria-describedby="asset_amount_rupees" className={'form-control' + (errors.advance_amount_for_asset && touched.advance_amount_for_asset ? ' is-invalid' : '')} id="advance_amount_for_asset" name="advance_amount_for_asset" placeholder="Enter advance amount for asset" min="0" onChange={handleChange} onBlur={handleBlur} value={values.advance_amount_for_asset} />
                                            </div>
                                            <div className="mt-n2 mb-3">
                                                <ErrorMessage name="advance_amount_for_asset" component="span" className="text-danger" />
                                            </div>
                                            
                                            <div className="mb-2">
                                                Monthly Rent Amount:
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text" id="asset_monthly_rupees">Rs.</span>
                                                <input type="number" aria-label="Rent Amount for Asset" aria-describedby="asset_monthly_rupees" className={'form-control' + (errors.monthly_rent_for_asset && touched.monthly_rent_for_asset ? ' is-invalid' : '')} id="monthly_rent_for_asset" name="monthly_rent_for_asset" placeholder="Enter monthly rent amount for asset" min="0" onChange={handleChange} onBlur={handleBlur} value={values.monthly_rent_for_asset} />
                                            </div>
                                            <div className="mt-n2 mb-3">
                                                <ErrorMessage name="monthly_rent_for_asset" component="span" className="text-danger" />
                                            </div>
                                        </div>
                                    )
                                }

                                { values.asset_for == 'Lease' &&
                                    (
                                        <div>
                                            <div className="mb-2">
                                                Lease Amount:
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text" id="asset_lease_rupees">Rs.</span>
                                                <input type="number" aria-label="Lease Amount for Asset" aria-describedby="asset_lease_rupees" className={'form-control' + (errors.lease_amount_for_asset && touched.lease_amount_for_asset ? ' is-invalid' : '')} id="lease_amount_for_asset" name="lease_amount_for_asset" placeholder="Enter advance amount for asset" min="0" onChange={handleChange} onBlur={handleBlur} value={values.lease_amount_for_asset} />
                                                
                                            </div>
                                            <div className="mt-n2 mb-3">
                                                <ErrorMessage name="lease_amount_for_asset" component="span" className="text-danger" />
                                            </div>
                                            
                                            <div className="mb-2">
                                                Lease Period:
                                            </div>
                                            <div className="input-group">
                                                <input type="number" className={'form-control' + (errors.lease_period_for_asset && touched.lease_period_for_asset ? ' is-invalid' : '')} aria-label="Asset lease period" name="lease_period_for_asset" id="lease_period_for_asset" placeholder="Enter asset lease period" min="0" onChange={handleChange} onBlur={handleBlur} value={values.lease_period_for_asset} />
                                                <Dropdown options={all_options.days_month_years_options} onChange={e => onClickDMYTypes(e, 'lease_period_for_asset_type', values, setFieldValue)} value={values.lease_period_for_asset_type} placeholder="Select period type" />
                                            </div>
                                            <div className="mt-n2 mb-3">
                                                <ErrorMessage name="lease_period_for_asset" component="span" className="text-danger" />
                                                <span> </span>
                                                <ErrorMessage name="lease_period_for_asset_type" component="span" className="text-danger" />
                                            </div>
                                        </div>
                                    )
                                }
                                
                                { values.asset_for == 'Sale' &&
                                    (
                                        <div>
                                            <div className="mb-2">
                                                Asset Price:
                                            </div>
                                            <div className="input-group">
                                                <span className="input-group-text" id="asset_prices">Rs.</span>
                                                <input type="number" aria-label="Asset price" aria-describedby="asset_prices" className={'form-control' + (errors.asset_price && touched.asset_price ? ' is-invalid' : '')} id="asset_price" name="asset_price" placeholder="Enter asset price" min="0" onChange={handleChange} onBlur={handleBlur} value={values.asset_price} />
                                                
                                            </div>
                                            <div className="mt-n2 mb-3">
                                                <ErrorMessage name="asset_price" component="span" className="text-danger" />
                                            </div>
                                        </div>
                                    )
                                }
                                
                                <div className="mb-3">
                                    <label htmlFor="dob" className="form-label">Asset available on from:</label>
                                    <div>
                                        <DatePicker id="asset_available_on_from" className={'form-control' + (errors.asset_available_on_from && touched.asset_available_on_from ? ' is-invalid' : '')} name="asset_available_on_from" onChange={e => onDobDateChange(e, 'asset_available_on_from', values, setFieldValue)} value={values.asset_available_on_from} />
                                    </div>
                                    <ErrorMessage name="asset_available_on_from" component="span" className="text-danger" />
                                </div>
                                

                                { values.asset_for == 'Rent' &&
                                    (
                                        <div>
                                            <div className="mb-2">
                                                Notice period for vocate asset:
                                            </div>
                                            <div className="input-group">
                                                <input type="number" className={'form-control' + (errors.notice_period_for_vocate_asset && touched.notice_period_for_vocate_asset ? ' is-invalid' : '')} aria-label="Asset notice period for vocate" name="notice_period_for_vocate_asset" id="notice_period_for_vocate_asset"  min="0" placeholder="Enter asset's notice period for vocate" onChange={handleChange} onBlur={handleBlur} value={values.notice_period_for_vocate_asset} />
                                                <Dropdown options={all_options.days_month_years_options} onChange={e => onClickDMYTypes(e, 'notice_period_for_vocate_asset_type', values, setFieldValue)} value={values.notice_period_for_vocate_asset_type} placeholder="Select period type" />
                                            </div>
                                            <div className="mt-n2 mb-3">
                                                <ErrorMessage name="notice_period_for_vocate_asset" component="span" className="text-danger" />
                                                <span> </span>
                                                <ErrorMessage name="notice_period_for_vocate_asset_type" component="span" className="text-danger" />
                                            </div>
                                        </div>
                                    )
                                }

                                <div className="my-2">
                                    <div className="my-2">
                                        Asset status now:
                                    </div>
                                    <CreatableSelect isLoading={values.asset_status_now_is_loading} formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="asset_status_now" name="asset_status_now" options={all_options.asset_status_now_options} onChange={e => onSelectChange(e, 'asset_status_now', values, setFieldValue)} defaultValue={values.asset_status_now} components={{LoadingIndicator}} styles={customStyles} />
                                    <ErrorMessage name="asset_status_now" component="span" className="text-danger" />
                                </div>

                                <FieldArray
                                    name="arrayShowMyAssetForTenantsTypes"
                                    render={arrayHelpers => (
                                        <div className="my-2">
                                            <div className="mb-2">
                                                Can we show your asset show to tenants?
                                            </div>
                                            {all_options.show_my_asset_for_tenants_options.map((type, index) =>
                                                (
                                                    <div className="form-check form-check-inline"  key={index}>
                                                        <input className="form-check-input" type="radio" name="show_my_asset_for_tenants" id={'show_my_asset_for_tenants_'+index} value={type.value} onChange={handleChange} onBlur={handleBlur} checked={values.show_my_asset_for_tenants == type.value } />
                                                        <label className="form-check-label" htmlFor={'show_my_asset_for_tenants_'+index}>{type.label}</label>
                                                    </div>
                                                )
                                            )}
                                            <ErrorMessage name="show_my_asset_for_tenants" component="span" className="text-danger" />
                                        </div>
                                    )}
                                />
                            </div>

                            
                            <FieldArray
                                name="rooms"
                                render={arrayHelpers => (
                                <div>
                                    <button type="button" className="btn btn-primary" onClick={() => arrayHelpers.push({ asset_id:0, room_name: '', room_size_in_length:0, room_size_in_length_type:'sq.ft.', room_size_in_width:0, room_size_in_width_type:'sq.ft.', room_image:'' })} >Add Rooms</button>
                                    {values.rooms.map((room, index) => (
                                        <div key={index}>
                                            <div className="mb-2">
                                                <label htmlFor={`rooms[${index}].room_name`}>Room Name</label>
                                                <Field type="text" className="form-control" id={`rooms[${index}].room_name`} name={`rooms[${index}].room_name`} />
                                            </div>

                                            <div className="mb-2">
                                                Room Length:
                                            </div>
                                            <div className="input-group mb-3">
                                                <Field type="number" className="form-control" id={`rooms[${index}].room_size_in_length`} name={`rooms[${index}].room_size_in_length`} />
                                                <Dropdown options={all_options.asset_length_width_options} id={`rooms[${index}].room_size_in_length_type`} name={`rooms[${index}].room_size_in_length_type`} onChange={e => onClickRoomsTypes(e, `rooms[${index}].room_size_in_length_type`, index, values, setFieldValue)} value={room.room_size_in_length_type} placeholder="Select unit" />
                                            </div>
                                            
                                            <div className="mb-2">
                                                Room Width:
                                            </div>
                                            <div className="input-group mb-3">
                                                <Field type="number" className="form-control" id={`rooms[${index}].room_size_in_width`} name={`rooms[${index}].room_size_in_width`} />
                                                <Dropdown options={all_options.asset_length_width_options} id={`rooms[${index}].room_size_in_width_type`} name={`rooms[${index}].room_size_in_width_type`} onChange={e => onClickRoomsTypes(e, `rooms[${index}].room_size_in_width_type`, index, values, setFieldValue)} value={room.room_size_in_width_type} placeholder="Select unit" />
                                            </div>

                                            <button type="button" className="btn btn-danger" onClick={() => arrayHelpers.remove(index)}>Remove</button>
                                        </div>
                                    ))}                                    
                                </div>
                                )}
                            />

                            

                            
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
export default AddAssets;