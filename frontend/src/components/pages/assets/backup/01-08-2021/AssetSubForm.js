import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { FieldArray, ErrorMessage } from 'formik';

function AssetSubForm(props) {

    const onSelectChange = (e, field, values, setFieldValue) => {
        //console.log(e);
        if(e.__isNew__) {
            //Save and select
        } else {
            setFieldValue(field, e.value);
        }
    };
    
    const onSelectMultipleChange = (e, field, values, setFieldValue) => {
        console.log(e);
    };
    
    
    
    const onClickDMYTypes = (e, field, values, setFieldValue) => {
        setFieldValue(field, e.value);
    }

    if(props.asset_type == 'House') {
        return(
            <div>
                <h4>
                    {props.asset_type}
                </h4>
                <div className="my-2">
                    Address
                </div>
                <div className="my-2">
                    Door No.
                </div>
                
                <div className="input-group mb-3">
                    <span className="input-group-text" id="door_numbers">No.</span>
                    <input type="number" className="form-control max-wid-5" placeholder="Door Number" min="0"  id="door_number"  name="door_number" aria-label="Door Number" aria-describedby="basic-addon1" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.door_number} />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="street" className="form-label">Street:</label>
                    <input type="text" className={'form-control' + (props.func.errors.street && props.func.touched.street ? ' is-invalid' : '')} id="street" name="street" placeholder="Enter street" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.street} />
                    <ErrorMessage name="street" component="span" className="text-danger" />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="nagar" className="form-label">Nagar:</label>
                    <input type="text" className={'form-control' + (props.func.errors.nagar && props.func.touched.nagar ? ' is-invalid' : '')} id="nagar" name="nagar" placeholder="Enter street" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.nagar} />
                    <ErrorMessage name="nagar" component="span" className="text-danger" />
                </div>
                
                <div className="my-2">
                    <div className="my-2">
                        City:
                    </div>
                    <CreatableSelect formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="city" name="city" options={props.options.city_options} onChange={e => onSelectChange(e, 'city', props.func.values, props.func.setFieldValue)} defaultValue={props.func.values.city} />
                </div>
                
                <div className="my-2">
                    <div className="my-2">
                        State:
                    </div>
                    <CreatableSelect formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="state" name="state" options={props.options.state_options} onChange={e => onSelectChange(e, 'state', props.func.values, props.func.setFieldValue)} defaultValue={props.func.values.state} />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="pincode" className="form-label">Pincode:</label>
                    <input type="number" className={'form-control' + (props.func.errors.pincode && props.func.touched.pincode ? ' is-invalid' : '')} min="0" id="pincode" name="pincode" placeholder="Enter pincode" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.pincode} />
                    <ErrorMessage name="street" component="span" className="text-danger" />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="landmark" className="form-label">Landmark</label>
                    <textarea className="form-control" id="landmark" name="landmark" rows="3"  onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.landmark}></textarea>
                    <ErrorMessage name="landmark" component="span" className="text-danger" />
                </div>

                <div className="mb-3">
                    <label htmlFor="number_of_rooms" className="form-label">Number of Rooms:</label>
                    <input type="number" className={'form-control' + (props.func.errors.number_of_rooms && props.func.touched.number_of_rooms ? ' is-invalid' : '')} min="0" id="number_of_rooms" name="number_of_rooms" placeholder="Enter number of rooms" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.number_of_rooms} />
                    <ErrorMessage name="number_of_rooms" component="span" className="text-danger" />
                </div>

                <div className="mb-2">
                    BHK
                </div>
                <div className="input-group mb-3">
                    <input type="number" className="form-control" id="bhk" name="bhk" placeholder="BHK" aria-label="BHK" aria-describedby="bhks" min="0" placeholder="Enter BHK" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.bhk} />
                    <span className="input-group-text" id="bhks">BHK</span>
                </div>

                <div className="mb-2">
                    Age of Asset:
                </div>
                <div className="input-group mb-3">    
                    <input type="number" className={'form-control' + (props.func.errors.age_of_asset && props.func.touched.age_of_asset ? ' is-invalid' : '')} aria-label="Asset age" min="0" name="age_of_asset" id="age_of_asset" placeholder="Enter asset age" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.age_of_asset} />
                    <ErrorMessage name="age_of_asset" component="span" className="text-danger" />
                    <Dropdown options={props.options.days_month_years_options} onChange={e => onClickDMYTypes(e, 'age_of_asset_type', props.func.values, props.func.setFieldValue)} value={props.func.values.age_of_asset_type} placeholder="Select an option" />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="asset_main_image" className="form-label">Asset Image</label>
                    <input id="asset_main_image" name="asset_main_image" type="file" onChange={(event) => { props.func.setFieldValue("asset_main_image", event.currentTarget.files[0]); }} className="form-control" />
                </div>
                
                <div className="mb-2">
                    Asset width:
                </div>
                <div className="input-group mb-3">
                    <input type="number" className={'form-control' + (props.func.errors.asset_size_in_width && props.func.touched.asset_size_in_width ? ' is-invalid' : '')} aria-label="Asset width" name="asset_size_in_width" id="asset_size_in_width" min="0" placeholder="Enter asset width" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.asset_size_in_width} />
                    <ErrorMessage name="asset_size_in_width" component="span" className="text-danger" />
                    <Dropdown options={props.options.asset_height_width_options} onChange={e => onClickDMYTypes(e, 'asset_size_in_width_type', props.func.values, props.func.setFieldValue)} value={props.func.values.asset_size_in_width_type} placeholder="Select an option" />
                </div>
                
                <div className="mb-2">
                    Asset height:
                </div>
                <div className="input-group mb-3">
                    <input type="number" className={'form-control' + (props.func.errors.asset_size_in_height && props.func.touched.asset_size_in_height ? ' is-invalid' : '')} aria-label="Asset height" name="asset_size_in_height" id="asset_size_in_height" min="0" placeholder="Enter asset height" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.asset_size_in_height} />
                    <ErrorMessage name="asset_size_in_height" component="span" className="text-danger" />
                    <Dropdown options={props.options.asset_height_width_options} onChange={e => onClickDMYTypes(e, 'asset_size_in_height_type', props.func.values, props.func.setFieldValue)} value={props.func.values.asset_size_in_height_type} placeholder="Select an option" />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="asset_notes_by_owner" className="form-label">Notes or hints about asset</label>
                    <textarea className="form-control" id="asset_notes_by_owner" name="asset_notes_by_owner" rows="3"  onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.asset_notes_by_owner}></textarea>
                    <ErrorMessage name="asset_notes_by_owner" component="span" className="text-danger" />
                </div>
                
                <div className="my-2">
                    <div className="my-2">
                        Who can contacts you:
                    </div>
                    <CreatableSelect isMulti formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="who_can_contact" name="who_can_contact" options={props.options.who_can_contact_options} onChange={e => onSelectMultipleChange(e, 'who_can_contact', props.func.values, props.func.setFieldValue)} defaultValue={props.func.values.who_can_contact} />
                </div>
                { props.func.values.asset_for == 'Rent' && 
                    (
                        <div>
                            <div className="mb-2">
                                Advance Amount:
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="asset_amount_rupees">Rs.</span>
                                <input type="number" aria-label="Advance Amount for Asset" aria-describedby="asset_amount_rupees" className={'form-control' + (props.func.errors.advance_amount_for_asset && props.func.touched.advance_amount_for_asset ? ' is-invalid' : '')} id="advance_amount_for_asset" name="advance_amount_for_asset" placeholder="Enter advance amount for asset" min="0" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.advance_amount_for_asset} />
                                <ErrorMessage name="advance_amount_for_asset" component="span" className="text-danger" />
                            </div>
                            
                            <div className="mb-2">
                                Monthly Rent Amount:
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="asset_monthly_rupees">Rs.</span>
                                <input type="number" aria-label="Rent Amount for Asset" aria-describedby="asset_monthly_rupees" className={'form-control' + (props.func.errors.monthly_rent_for_asset && props.func.touched.monthly_rent_for_asset ? ' is-invalid' : '')} id="monthly_rent_for_asset" name="monthly_rent_for_asset" placeholder="Enter monthly rent amount for asset" min="0" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.monthly_rent_for_asset} />
                                <ErrorMessage name="monthly_rent_for_asset" component="span" className="text-danger" />
                            </div>
                        </div>
                    )
                }

                { props.func.values.asset_for == 'Lease' &&
                    (
                        <div>
                            <div className="mb-2">
                                Lease Amount:
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="asset_lease_rupees">Rs.</span>
                                <input type="number" aria-label="Lease Amount for Asset" aria-describedby="asset_lease_rupees" className={'form-control' + (props.func.errors.lease_amount_for_asset && props.func.touched.lease_amount_for_asset ? ' is-invalid' : '')} id="lease_amount_for_asset" name="lease_amount_for_asset" placeholder="Enter advance amount for asset" min="0" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.lease_amount_for_asset} />
                                <ErrorMessage name="lease_amount_for_asset" component="span" className="text-danger" />
                            </div>
                            
                            <div className="mb-2">
                                Lease Period:
                            </div>
                            <div className="input-group mb-3">
                                <input type="number" className={'form-control' + (props.func.errors.lease_period_for_asset && props.func.touched.lease_period_for_asset ? ' is-invalid' : '')} aria-label="Asset lease period" name="lease_period_for_asset" id="lease_period_for_asset" placeholder="Enter asset lease period" min="0" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.lease_period_for_asset} />
                                <ErrorMessage name="lease_period_for_asset" component="span" className="text-danger" />
                                <Dropdown options={props.options.days_month_years_options} onChange={e => onClickDMYTypes(e, 'lease_period_for_asset_type', props.func.values, props.func.setFieldValue)} value={props.func.values.lease_period_for_asset_type} placeholder="Select an option" />
                            </div>
                        </div>
                    )
                }
                
                
                
               
                <div className="mb-2">
                    Asset Available within:
                </div>
                <div className="input-group mb-3">
                    <input type="number" className={'form-control' + (props.func.errors.asset_available_within && props.func.touched.asset_available_within ? ' is-invalid' : '')} aria-label="Asset available within"  min="0" name="asset_available_within" id="asset_available_within" placeholder="Enter asset within in avaible" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.asset_available_within} />
                    <ErrorMessage name="asset_available_within" component="span" className="text-danger" />
                    <Dropdown options={props.options.days_month_years_options} onChange={e => onClickDMYTypes(e, 'asset_available_within_type', props.func.values, props.func.setFieldValue)} value={props.func.values.asset_available_within_type} placeholder="Select an option" />
                </div>

                <div className="mb-2">
                    Notice period for vocate asset:
                </div>
                <div className="input-group mb-3">
                    <input type="number" className={'form-control' + (props.func.errors.notice_period_for_vocate_asset && props.func.touched.notice_period_for_vocate_asset ? ' is-invalid' : '')} aria-label="Asset notice period for vocate" name="notice_period_for_vocate_asset" id="notice_period_for_vocate_asset"  min="0" placeholder="Enter asset notice period for vocate" onChange={props.func.handleChange} onBlur={props.func.handleBlur} value={props.func.values.notice_period_for_vocate_asset} />
                    <ErrorMessage name="notice_period_for_vocate_asset" component="span" className="text-danger" />
                    <Dropdown options={props.options.days_month_years_options} onChange={e => onClickDMYTypes(e, 'notice_period_for_vocate_asset_type', props.func.values, props.func.setFieldValue)} value={props.func.values.notice_period_for_vocate_asset_type} placeholder="Select an option" />
                </div>

                <div className="my-2">
                    <div className="my-2">
                        Asset status now:
                    </div>
                    <CreatableSelect formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="asset_status_now" name="asset_status_now" options={props.options.asset_status_now_options} onChange={e => onSelectChange(e, 'asset_status_now', props.func.values, props.func.setFieldValue)} defaultValue={props.func.values.onSelectChange} />
                </div>

                <FieldArray
                    name="arrayShowMyAssetForTenantsTypes"
                    render={arrayHelpers => (
                        <div className="my-2">
                            <div className="mb-2">
                                Can we show your asset show to tenants?
                                <ErrorMessage name="show_my_asset_for_tenants" component="span" className="text-danger" />
                            </div>
                            {props.options.show_my_asset_for_tenants_options.map((type, index) => 
                                (
                                    <div className="form-check form-check-inline"  key={index}>
                                        <input className="form-check-input" type="radio" name="show_my_asset_for_tenants" id={'show_my_asset_for_tenants_'+index} value={type.value} onChange={props.func.handleChange} onBlur={props.func.handleBlur} checked={props.func.values.show_my_asset_for_tenants == type.value } />
                                        <label className="form-check-label" htmlFor={'show_my_asset_for_tenants_'+index}>{type.label}</label>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                />
            </div>
        );
    } else if(props.asset_type == 'Appartment') {
        return(
            <div>
                <h4>
                    {props.asset_type}
                </h4>
                <div>

                </div>
            </div>
        );
    } else if(props.asset_type == 'Store') {
        return(
            <div>
                <h4>
                    {props.asset_type}
                </h4>
            </div>
        );
    } else if(props.asset_type == 'Koddon') {
        return(
            <div>
                <h4>
                    {props.asset_type}
                </h4>
            </div>
        );
    } else if(props.asset_type == 'Land') {
        return(
            <div>
                <h4>
                    {props.asset_type}
                </h4>
            </div>
        );
    }
}

export default AssetSubForm;