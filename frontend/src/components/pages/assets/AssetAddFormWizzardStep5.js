import React from 'react';
import { ErrorMessage } from 'formik';
import Dropdown from 'react-dropdown';
import CreatableSelect from 'react-select/creatable';
import LoadingIndicator from '../common/LoadingIndicator';


function AssetAddFormWizzardStep5(props) {
    const handleNext = async () => {
        await props.formikProps.setTouched({['who_can_contact']:true, ['advance_amount_for_asset']:true, ['monthly_rent_for_asset']:true, ['lease_amount_for_asset']:true, ['lease_period_for_asset']:true, ['lease_period_for_asset_type']:true, ['asset_price']:true});
        if(props.formikProps.errors.who_can_contact == undefined && props.formikProps.errors.advance_amount_for_asset == undefined && props.formikProps.errors.monthly_rent_for_asset == undefined && props.formikProps.errors.lease_amount_for_asset == undefined && props.formikProps.errors.lease_period_for_asset == undefined && props.formikProps.errors.lease_period_for_asset_type == undefined && props.formikProps.errors.asset_price == undefined) {
            props.nextStep();
        }
    };

    return (
        <div>
            <div className="my-2">
                <div className="my-2">
                    Who can contacts you:
                </div>
                <CreatableSelect isLoading={props.formikProps.values.who_can_contact_is_loading} isMulti formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} createOptionPosition="first" className="basic-single" classNamePrefix="select" id="who_can_contact" name="who_can_contact" options={props.all_options.who_can_contact_options} createOptionPosition={"first"} onChange={(value, actionMeta) => props.onSelectMultipleChange(value, actionMeta, 'who_can_contact', props.formikProps.values, props.formikProps.setFieldValue)} defaultValue={props.formikProps.values.who_can_contact} components={{LoadingIndicator}} styles={props.customStyles} />
                <ErrorMessage name="who_can_contact" component="span" className="text-danger" />
            </div>
            { props.formikProps.values.asset_for == 1 /*1 => 'Rent' */ &&
                (
                    <div>
                        <div className="mb-2">
                            Advance Amount:
                        </div>
                        <div className="input-group">
                            <span className="input-group-text" id="asset_amount_rupees">Rs.</span>
                            <input type="number" aria-label="Advance Amount for Asset" aria-describedby="asset_amount_rupees" className={'form-control' + (props.formikProps.errors.advance_amount_for_asset && props.formikProps.touched.advance_amount_for_asset ? ' is-invalid' : '')} id="advance_amount_for_asset" name="advance_amount_for_asset" placeholder="Enter advance amount for asset" min="0" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.advance_amount_for_asset} />
                        </div>
                        <div className="mt-n2 mb-3">
                            <ErrorMessage name="advance_amount_for_asset" component="span" className="text-danger" />
                        </div>
                        
                        <div className="mb-2">
                            Monthly Rent Amount:
                        </div>
                        <div className="input-group">
                            <span className="input-group-text" id="asset_monthly_rupees">Rs.</span>
                            <input type="number" aria-label="Rent Amount for Asset" aria-describedby="asset_monthly_rupees" className={'form-control' + (props.formikProps.errors.monthly_rent_for_asset && props.formikProps.touched.monthly_rent_for_asset ? ' is-invalid' : '')} id="monthly_rent_for_asset" name="monthly_rent_for_asset" placeholder="Enter monthly rent amount for asset" min="0" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.monthly_rent_for_asset} />
                        </div>
                        <div className="mt-n2 mb-3">
                            <ErrorMessage name="monthly_rent_for_asset" component="span" className="text-danger" />
                        </div>
                    </div>
                )
            }

            { props.formikProps.values.asset_for == 2 /*2 => 'Lease' */ &&
                (
                    <div>
                        <div className="mb-2">
                            Lease Amount:
                        </div>
                        <div className="input-group">
                            <span className="input-group-text" id="asset_lease_rupees">Rs.</span>
                            <input type="number" aria-label="Lease Amount for Asset" aria-describedby="asset_lease_rupees" className={'form-control' + (props.formikProps.errors.lease_amount_for_asset && props.formikProps.touched.lease_amount_for_asset ? ' is-invalid' : '')} id="lease_amount_for_asset" name="lease_amount_for_asset" placeholder="Enter advance amount for asset" min="0" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.lease_amount_for_asset} />
                            
                        </div>
                        <div className="mt-n2 mb-3">
                            <ErrorMessage name="lease_amount_for_asset" component="span" className="text-danger" />
                        </div>
                        
                        <div className="mb-2">
                            Lease Period:
                        </div>
                        <div className="input-group">
                            <input type="number" className={'form-control' + (props.formikProps.errors.lease_period_for_asset && props.formikProps.touched.lease_period_for_asset ? ' is-invalid' : '')} aria-label="Asset lease period" name="lease_period_for_asset" id="lease_period_for_asset" placeholder="Enter asset lease period" min="0" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.lease_period_for_asset} />
                            <Dropdown options={props.all_options.days_month_years_options} onChange={e => props.onClickDMYTypes(e, 'lease_period_for_asset_type', props.formikProps.values, props.formikProps.setFieldValue)} value={props.all_options.days_month_years_options[props.formikProps.values.lease_period_for_asset_type - 1]} placeholder="Select period type" />
                        </div>
                        <div className="mt-n2 mb-3">
                            <ErrorMessage name="lease_period_for_asset" component="span" className="text-danger" />
                            <span> </span>
                            <ErrorMessage name="lease_period_for_asset_type" component="span" className="text-danger" />
                        </div>
                    </div>
                )
            }
            
            { props.formikProps.values.asset_for == 3 /*3 => 'Sale' */ &&
                (
                    <div>
                        <div className="mb-2">
                            Asset Price:
                        </div>
                        <div className="input-group">
                            <span className="input-group-text" id="asset_prices">Rs.</span>
                            <input type="number" aria-label="Asset price" aria-describedby="asset_prices" className={'form-control' + (props.formikProps.errors.asset_price && props.formikProps.touched.asset_price ? ' is-invalid' : '')} id="asset_price" name="asset_price" placeholder="Enter asset price" min="0" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.asset_price} />
                            
                        </div>
                        <div className="mt-n2 mb-3">
                            <ErrorMessage name="asset_price" component="span" className="text-danger" />
                        </div>
                    </div>
                )
            }

            <p>
                <button type="button" className="btn btn-success" onClick={handleNext}>Next Step</button>
                <button type="button" className="btn btn-info" onClick={props.previousStep}>Previous</button>
            </p>
        </div>
    );
}
export default AssetAddFormWizzardStep5;