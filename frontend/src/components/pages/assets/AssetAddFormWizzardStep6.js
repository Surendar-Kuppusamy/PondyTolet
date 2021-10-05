import React from 'react';
import { FieldArray, ErrorMessage } from 'formik';
import Dropdown from 'react-dropdown';
import DatePicker from "react-datepicker";
import CreatableSelect from 'react-select/creatable';
import LoadingIndicator from '../common/LoadingIndicator';


function AssetAddFormWizzardStep6(props) {
    const handleNext = async () => {
        await props.formikProps.setTouched({['asset_available_on_from']:true, ['notice_period_for_vocate_asset']:true, ['notice_period_for_vocate_asset_type']:true, ['asset_status_now']:true, ['show_my_asset_for_tenants']:true});
        console.log(props);
        if(props.formikProps.errors.asset_available_on_from == undefined && props.formikProps.errors.notice_period_for_vocate_asset == undefined && props.formikProps.errors.notice_period_for_vocate_asset_type == undefined && props.formikProps.errors.asset_status_now == undefined && props.formikProps.errors.show_my_asset_for_tenants == undefined) {
            props.nextStep();
        }
    };

    return (
        <div>
            <h4>Step: {props.currentStep}</h4>    
            <div className="mb-3">
                <label htmlFor="dob" className="form-label">Asset available on from:</label>
                <div>
                    <DatePicker id="asset_available_on_from" className={'form-control' + (props.formikProps.errors.asset_available_on_from && props.formikProps.touched.asset_available_on_from ? ' is-invalid' : '')} name="asset_available_on_from" minDate={new Date()} onChange={e => props.onDobDateChange(e, 'asset_available_on_from', props.formikProps.values, props.formikProps.setFieldValue)} value={props.formikProps.values.asset_available_on_from} />
                </div>
                <ErrorMessage name="asset_available_on_from" component="span" className="text-danger" />
            </div>
            

            { props.formikProps.values.asset_for == 1 /*1 => 'Rent' */ &&
                (
                    <div>
                        <div className="mb-2">
                            Notice period for vocate asset:
                        </div>
                        <div className="input-group">
                            <input type="number" className={'form-control' + (props.formikProps.errors.notice_period_for_vocate_asset && props.formikProps.touched.notice_period_for_vocate_asset ? ' is-invalid' : '')} aria-label="Asset notice period for vocate" name="notice_period_for_vocate_asset" id="notice_period_for_vocate_asset"  min="0" placeholder="Enter asset's notice period for vocate" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.notice_period_for_vocate_asset} />
                            <Dropdown options={props.all_options.days_month_years_options} onChange={e => props.onClickDMYTypes(e, 'notice_period_for_vocate_asset_type', props.formikProps.values, props.formikProps.setFieldValue)} value={props.all_options.days_month_years_options[props.formikProps.values.notice_period_for_vocate_asset_type - 1]} placeholder="Select period type" />
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
                <CreatableSelect isLoading={props.formikProps.values.asset_status_now_is_loading} formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="asset_status_now" name="asset_status_now" options={props.all_options.asset_status_now_options} onChange={e => props.onSelectChange(e, 'asset_status_now', props.formikProps.values, props.formikProps.setFieldValue)} defaultValue={props.formikProps.values.asset_status_now} components={{LoadingIndicator}} styles={props.customStyles} />
                <ErrorMessage name="asset_status_now" component="span" className="text-danger" />
            </div>

            <FieldArray
                name="arrayShowMyAssetForTenantsTypes"
                render={arrayHelpers => (
                    <div className="my-2">
                        <div className="mb-2">
                            Can we show your asset show to tenants?
                        </div>
                        {props.all_options.show_my_asset_for_tenants_options.map((type, index) =>
                            (
                                <div className="form-check form-check-inline"  key={index}>
                                    <input className="form-check-input" type="radio" name="show_my_asset_for_tenants" id={'show_my_asset_for_tenants_'+type.key} value={type.key} onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} checked={props.formikProps.values.show_my_asset_for_tenants == type.key } />
                                    <label className="form-check-label" htmlFor={'show_my_asset_for_tenants_'+type.key}>{type.label}</label>
                                </div>
                            )
                        )}
                        <ErrorMessage name="show_my_asset_for_tenants" component="span" className="text-danger" />
                    </div>
                )}
            />

            <p>
                {/* <button type="button" className="btn btn-success" onClick={handleNext}>Next Step</button> */}
                <button type="button" className="btn btn-info" onClick={props.previousStep}>Previous</button>
            </p>
            {/* <div className="mb-2 mt-2">
                <button className="btn btn-primary" type="submit">
                    Submit
                </button>
            </div> */}
        </div>
    );
}
export default AssetAddFormWizzardStep6;