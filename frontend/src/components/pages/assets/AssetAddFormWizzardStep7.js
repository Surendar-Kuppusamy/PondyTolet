import React from 'react';
import { Field, FieldArray, ErrorMessage } from 'formik';
import Dropdown from 'react-dropdown';
import FileUploadComponent from '../common/FileUploadComponent';
import { isNumber } from '../../../commonFunctions/Validations';


function AssetAddFormWizzardStep7(props) {
    const handleNext = async () => {
        props.formikProps.values.rooms.map((value, key) => {
            console.log(value, key);
            if(value.room_name == '') {
                let error_name = document.getElementById("error.rooms["+key+"].room_name");
                error_name.innerHTML = "Name required";
            }
        });
    };

    return (
        <div>
            
            <FieldArray
                name="rooms"
                render={arrayHelpers => (
                <div>
                    <button type="button" className="btn btn-primary" onClick={() => arrayHelpers.push({ asset_id:0, room_name: '', room_size_in_length:0, room_size_in_length_type:'sq.ft.', room_size_in_width:0, room_size_in_width_type:'sq.ft.', room_image:'' })} >Add Rooms</button>
                    {props.formikProps.values.rooms.map((room, index) => (
                        <div key={index}>
                            <div className="mb-2">
                                <label htmlFor={`rooms[${index}].room_name`}>Room Name</label>
                                <Field type="text" className="form-control" id={`rooms[${index}].room_name`} name={`rooms[${index}].room_name`} onChange={props.formikProps.handleChange} onBlur={props.formikProps.handleBlur} value={props.formikProps.values.rooms[index].room_name} />
                                <span className="text-danger" id={`error.rooms[${index}].room_name`}></span>
                            </div>

                            <div className="mb-2">
                                <FileUploadComponent maxFiles="4" fileTypes=".jpeg,.png" setField={props.formikProps} fieldName={`rooms[${index}].room_images`} />
                            </div>

                            <div className="mb-2">
                                Room Length:
                            </div>
                            <div className="input-group mb-3">
                                <Field type="number" className="form-control" onChange={isNumber} id={`rooms[${index}].room_size_in_length`} name={`rooms[${index}].room_size_in_length`} />
                                <Dropdown options={props.all_options.asset_length_width_options} id={`rooms[${index}].room_size_in_length_type`} name={`rooms[${index}].room_size_in_length_type`} onChange={e => props.onClickRoomsTypes(e, `rooms[${index}].room_size_in_length_type`, index, props.formikProps.values, props.formikProps.setFieldValue)} value={props.formikProps.values.rooms[index].room_size_in_length_type} placeholder="Select unit" />
                            </div>
                            
                            <div className="mb-2">
                                Room Width:
                            </div>
                            <div className="input-group mb-3">
                                <Field type="number" className="form-control" id={`rooms[${index}].room_size_in_width`} name={`rooms[${index}].room_size_in_width`} />
                                <Dropdown options={props.all_options.asset_length_width_options} id={`rooms[${index}].room_size_in_width_type`} name={`rooms[${index}].room_size_in_width_type`} onChange={e => props.onClickRoomsTypes(e, `rooms[${index}].room_size_in_width_type`, index, props.formikProps.values, props.formikProps.setFieldValue)} value={props.formikProps.values.rooms[index].room_size_in_width_type} placeholder="Select unit" />
                            </div>
                            <button type="button" className="btn btn-danger" onClick={() => arrayHelpers.remove(index)}>Remove</button>
                        </div>
                    ))}                       
                </div>
                )}
            />
            
            <p>
                <button type="button" className="btn btn-success" onClick={handleNext}>Next Step</button>
                <button type="button" className="btn btn-info" onClick={props.previousStep}>Previous</button>
            </p>
            
        </div>
    );
}
export default AssetAddFormWizzardStep7;