import React from 'react';
import FileUploadComponent from '../common/FileUploadComponent';
import Dropdown from 'react-dropdown';
import { ErrorMessage } from 'formik';


function AssetAddFormWizzardStep4(props) {
    const handleNext = async () => {
        await props.formikProps.setTouched({['asset_main_image']:true, ['asset_size_in_width']:true, ['asset_size_in_width_type']:true, ['asset_size_in_length']:true, ['asset_size_in_length_type']:true, ['asset_notes_by_owner']:true});
        console.log(props);
        if(props.formikProps.errors.asset_main_image == undefined && props.formikProps.errors.asset_size_in_width == undefined && props.formikProps.errors.asset_size_in_width_type == undefined && props.formikProps.errors.asset_size_in_length == undefined && props.formikProps.errors.asset_size_in_length_type == undefined && props.formikProps.errors.asset_notes_by_owner == undefined) {
            props.nextStep();
        }
    };
    

    return (
        <div>
            <div className="mb-3">
                {/* <FileUploadComponent maxFiles="1" fileTypes=".jpeg,.png" setField={props.formikProps} fieldName="asset_main_image" /> */}

                {/* <label htmlFor="asset_main_image" className="form-label">Asset Image</label>
                <input id="asset_main_image" name="asset_main_image" type="file" onChange={(event) => { props.formikProps.setFieldValue("asset_main_image", event.currentTarget.files[0]); }} className="form-control" />
                <ErrorMessage name="asset_main_image" component="span" className="text-danger" /> */}
            </div>
            
            <div className="mb-2">
                Asset width:
            </div>
            <div className="input-group mb-3">
                <input type="number" className={'form-control' + (props.formikProps.errors.asset_size_in_width && props.formikProps.touched.asset_size_in_width ? ' is-invalid' : '')} aria-label="Asset width" name="asset_size_in_width" id="asset_size_in_width" min="0" placeholder="Enter asset width" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.asset_size_in_width} />
                <Dropdown options={props.all_options.asset_length_width_options} onChange={e => props.onClickDMYTypes(e, 'asset_size_in_width_type', props.formikProps.values, props.formikProps.setFieldValue)} value={props.all_options.asset_length_width_options[props.formikProps.values.asset_size_in_width_type - 1]} placeholder="Select unit" />
                <ErrorMessage name="asset_size_in_width" component="span" className="text-danger" />
                <ErrorMessage name="asset_size_in_width_type" component="span" className="text-danger" />
            </div>
            
            <div className="mb-2">
                Asset Length:
            </div>
            <div className="input-group mb-3">
                <input type="number" className={'form-control' + (props.formikProps.errors.asset_size_in_length && props.formikProps.touched.asset_size_in_length ? ' is-invalid' : '')} aria-label="Asset length" name="asset_size_in_length" id="asset_size_in_length" min="0" placeholder="Enter asset length" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.asset_size_in_length} />
                <Dropdown options={props.all_options.asset_length_width_options} onChange={e => props.onClickDMYTypes(e, 'asset_size_in_length_type', props.formikProps.values, props.formikProps.setFieldValue)} value={props.all_options.asset_length_width_options[props.formikProps.values.asset_size_in_length_type - 1]} placeholder="Select unit" />
                <ErrorMessage name="asset_size_in_length" component="span" className="text-danger" />
                <ErrorMessage name="asset_size_in_length_type" component="span" className="text-danger" />
            </div>
            
            <div className="mb-3">
                <label htmlFor="asset_notes_by_owner" className="form-label">Notes or hints about asset:</label>
                <textarea className="form-control" id="asset_notes_by_owner" name="asset_notes_by_owner" rows="3"  onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.asset_notes_by_owner}></textarea>
                <ErrorMessage name="asset_notes_by_owner" component="span" className="text-danger" />
            </div>

            <p>
                <button type="button" className="btn btn-success" onClick={handleNext}>Next Step</button>
                <button type="button" className="btn btn-info" onClick={props.previousStep}>Previous</button>
            </p>
        </div>
    );
}
export default AssetAddFormWizzardStep4;