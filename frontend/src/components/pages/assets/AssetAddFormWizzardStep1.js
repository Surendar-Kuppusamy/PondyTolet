import React, { useEffect, useState } from 'react';
import { FieldArray, ErrorMessage } from 'formik';

function AssetAddFormWizzardStep1(props) {
    
    const handleNext = async () => {
        await props.formikProps.setTouched({['type_of_asset']:true, ['asset_for']:true});
        if(props.formikProps.errors.type_of_asset == undefined && props.formikProps.errors.asset_for == undefined) {
            props.nextStep();
        }        
    };
    return (
        <div>
            <FieldArray
                name="arrayOfAssetTypes"
                render={arrayHelpers => (
                    <div className="my-2">
                        <div className="mb-2">
                            Asset/Property Type:
                        </div>
                        {props.all_options.type_of_asset_options.map((type, index) =>
                            (
                                <div className="form-check form-check-inline"  key={index}>
                                    <input className="form-check-input" type="radio" name="type_of_asset" id={'type_of_asset_'+type.key} value={type.key} onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} checked={props.formikProps.values.type_of_asset == type.key } />
                                    <label className="form-check-label" htmlFor={'type_of_asset_'+type.key}>{type.label}</label>
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
                        {props.all_options.asset_for_options.map((type, index) =>
                            (
                                <div className="form-check form-check-inline"  key={index}>
                                    <input className="form-check-input" type="radio" name="asset_for" id={'asset_for_options_'+type.key} value={type.key} onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} checked={props.formikProps.values.asset_for == type.key } />
                                    <label className="form-check-label" htmlFor={'asset_for_options_'+type.key}>{type.label}</label>
                                </div>
                            )
                        )}
                        <br/>
                        <ErrorMessage name="asset_for" component="span" className="text-danger" />
                    </div>
                )}
            />
            <div className="mt-2">
                <button type="button" className="btn btn-success" onClick={handleNext}>Next Step</button>
            </div>
        </div>
    );
}
export default AssetAddFormWizzardStep1;