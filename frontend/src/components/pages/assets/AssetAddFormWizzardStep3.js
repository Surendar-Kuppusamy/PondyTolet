import React, { useEffect } from 'react';
import Dropdown from 'react-dropdown';
import { ErrorMessage } from 'formik';

function AssetAddFormWizzardStep3(props) {
    window.scrollTo(0, 0);
    const handleNext = async () => {
        await props.formikProps.setTouched({['number_of_rooms']:true, ['bhk']:true, ['age_of_asset']:true, ['age_of_asset_type']:true});
        console.log(props);
        if(props.formikProps.errors.number_of_rooms == undefined && props.formikProps.errors.bhk == undefined && props.formikProps.errors.age_of_asset == undefined && props.formikProps.errors.age_of_asset_type == undefined) {
            props.nextStep();
        }
    };

    return (
        <div>
            <div className="mb-3">
                <label htmlFor="number_of_rooms" className="form-label">Number of rooms:</label>
                <input type="number" className={'form-control' + (props.formikProps.errors.number_of_rooms && props.formikProps.touched.number_of_rooms ? ' is-invalid' : '')} min="0" id="number_of_rooms" name="number_of_rooms" placeholder="Enter number of rooms" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.number_of_rooms} />
                <ErrorMessage name="number_of_rooms" component="span" className="text-danger" />
            </div>

            <div className="mb-2">
                BHK
            </div>
            <div className="input-group">
                <input type="number" className={'form-control' + (props.formikProps.errors.bhk && props.formikProps.touched.bhk ? ' is-invalid' : '')} id="bhk" name="bhk" placeholder="BHK" aria-label="BHK" aria-describedby="bhks" min="0" placeholder="Enter BHK" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.bhk} />
                <span className="input-group-text" id="bhks">BHK</span>
            </div>
            <div className="mt-n2 mb-3">
                <ErrorMessage name="bhk" component="span" className="text-danger" />
            </div>
            

            <div className="mb-2">
                Age of Asset:
            </div>
            <div className="input-group">    
                <input type="number" className={'form-control' + (props.formikProps.errors.age_of_asset && props.formikProps.touched.age_of_asset ? ' is-invalid' : '')} aria-label="Asset age" min="0" name="age_of_asset" id="age_of_asset" placeholder="Enter asset age" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.age_of_asset} />
                <Dropdown options={props.all_options.days_month_years_options} onChange={e => props.onClickDMYTypes(e, 'age_of_asset_type', props.formikProps.values, props.formikProps.setFieldValue)} value={props.all_options.days_month_years_options[props.formikProps.values.age_of_asset_type - 1]} placeholder="Select period type" />
            </div>
            <div className="mt-n2 mb-3">
                <ErrorMessage name="age_of_asset" component="span" className="text-danger" />
                <span> </span>
                <ErrorMessage name="age_of_asset_type" component="span" className="text-danger" />
            </div>

            <p>
                <button type="button" className="btn btn-success" onClick={handleNext}>Next Step</button>
                <button type="button" className="btn btn-info" onClick={props.previousStep}>Previous</button>
            </p>
        </div>
    );
}
export default AssetAddFormWizzardStep3;