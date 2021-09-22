import React from 'react';
import CreatableSelect from 'react-select/creatable';
import LoadingIndicator from '../common/LoadingIndicator';
import { FieldArray, ErrorMessage } from 'formik';


function AssetAddFormWizzardStep2(props) {
    window.scrollTo(0, 0);
    const handleNext = async () => {
        await props.formikProps.setTouched({['asset_name']:true, ['door_number']:true, ['address_hint']:true, ['street']:true, ['nagar']:true, ['city']:true, ['state']:true, ['pincode']:true, ['landmark']:true});
        if(props.formikProps.errors.asset_name == undefined && props.formikProps.errors.door_number == undefined && props.formikProps.errors.address_hint == undefined && props.formikProps.errors.street == undefined && props.formikProps.errors.nagar == undefined && props.formikProps.errors.city == undefined && props.formikProps.errors.state == undefined && props.formikProps.errors.pincode == undefined && props.formikProps.errors.landmark == undefined) {
            props.nextStep();
        }
    };

    return (
        <div>
            <h4>
                {props.formikProps.values.type_of_asset}
            </h4>

            <div className="mb-3">
                <label htmlFor="asset_name" className="form-label">Asset Name:</label>
                <input type="text" className={'form-control' + (props.formikProps.errors.asset_name && props.formikProps.touched.asset_name ? ' is-invalid' : '')} id="asset_name" name="asset_name" placeholder="Enter your last name" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.asset_name} />
                <ErrorMessage name="asset_name" component="span" className="text-danger" />
            </div>
            
            <div className="my-2">
                Address
            </div>

            { props.formikProps.values.type_of_asset != 5 /*5 => 'Land' */ && (
                    <div>
                        <div className="my-2">
                            Door No.
                        </div>
                        <div className="input-group">
                            <span className="input-group-text" id="door_numbers">No.</span>
                            <input type="number" className="form-control max-wid-5" placeholder="Enter door number" min="0" id="door_number"  name="door_number" aria-label="Door Number" aria-describedby="door_numbers" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.door_number} />
                            <input type="text" className={'form-control ml-3' + (props.formikProps.errors.address_hint && props.formikProps.touched.address_hint ? ' is-invalid' : '')} id="address_hint" name="address_hint" placeholder="" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.address_hint} />
                        </div>
                        <div className="mt-n2 mb-3">
                            <ErrorMessage name="door_number" component="span" className="text-danger" />
                            <ErrorMessage name="address_hint" component="span" className="text-danger" />
                        </div>
                    </div>
                )
            }
            
            { props.formikProps.values.type_of_asset == 5 /*5 => 'Land' */ && (
                    <div className="mb-3">
                        <label htmlFor="address_hint">Hint</label>
                        <input type="text" className={'form-control' + (props.formikProps.errors.address_hint && props.formikProps.touched.address_hint ? ' is-invalid' : '')} id="address_hint" name="address_hint" placeholder="" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.address_hint} />
                        <ErrorMessage name="address_hint" component="span" className="text-danger" />
                    </div>                                        
                )
            }

            <div className="mb-3">
                <label htmlFor="street" className="form-label">Street:</label>
                <input type="text" className={'form-control' + (props.formikProps.errors.street && props.formikProps.touched.street ? ' is-invalid' : '')} id="street" name="street" placeholder="Enter street" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.street} />
                <ErrorMessage name="street" component="span" className="text-danger" />
            </div>
            
            <div className="mb-3">
                <label htmlFor="nagar" className="form-label">Nagar:</label>
                <input type="text" className={'form-control' + (props.formikProps.errors.nagar && props.formikProps.touched.nagar ? ' is-invalid' : '')} id="nagar" name="nagar" placeholder="Enter nagar" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.nagar} />
                <ErrorMessage name="nagar" component="span" className="text-danger" />
            </div>
            
            <div className="my-2">
                <div className="my-2">
                    City:
                </div>
                <CreatableSelect isLoading={props.formikProps.values.city_is_loading} formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="city" name="city" options={props.all_options.city_options} onChange={e => props.onSelectChange(e, 'city', props.formikProps.values, props.formikProps.setFieldValue)} defaultValue={props.formikProps.values.city} components={{LoadingIndicator}} styles={props.customStyles} />
                <ErrorMessage name="city" component="span" className="text-danger" />
            </div>
            
            <div className="my-2">
                <div className="my-2">
                    State:
                </div>
                <CreatableSelect isLoading={props.formikProps.values.state_is_loading} formatCreateLabel={(inputValue) => 'Add or Create "'+inputValue+'"'} className="basic-single" classNamePrefix="select" id="state" name="state" options={props.all_options.state_options} onChange={e => props.onSelectChange(e, 'state', props.formikProps.values, props.formikProps.setFieldValue)} defaultValue={props.formikProps.values.state} components={{LoadingIndicator}} styles={props.customStyles} />
                <ErrorMessage name="state" component="span" className="text-danger" />
            </div>
            
            <div className="mb-3">
                <label htmlFor="pincode" className="form-label">Pincode:</label>
                <input type="number" className={'form-control' + (props.formikProps.errors.pincode && props.formikProps.touched.pincode ? ' is-invalid' : '')} min="0" id="pincode" name="pincode" placeholder="Enter pincode" onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.pincode} />
                <ErrorMessage name="pincode" component="span" className="text-danger" />
            </div>
            
            <div className="mb-3">
                <label htmlFor="landmark" className="form-label">Landmark</label>
                <textarea className="form-control" id="landmark" name="landmark" rows="3"  onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.landmark}></textarea>
                <ErrorMessage name="landmark" component="span" className="text-danger" />
            </div>

            <p>
                <button type="button" className="btn btn-success" onClick={handleNext}>Next Step</button>
                <button type="button" className="btn btn-info" onClick={props.previousStep}>Previous</button>
            </p>
        </div>
    );
}
export default AssetAddFormWizzardStep2;