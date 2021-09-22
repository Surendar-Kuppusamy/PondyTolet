import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect }  from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import { subYears } from 'date-fns';
import { toast } from 'react-toastify';
import { signup } from '../../../actions/userActions';
import Loader from '../../Loader';
import { USER_LOADER, SIGNUP_FORM } from '../../../constants/constants';

const mapDispatchToProps = dispatch => {
    return {
        register: () => {
            dispatch(signup());
        }
    }   
}

function Signup(props) {

    let location = useLocation();
    let history = useHistory();

    const userState = useSelector((state) => state.userState);

    const { signup_result, signup_error } = userState;

    const dispatch = useDispatch();    
    /* dispatch({type:'counter/decremented'}); */

    useEffect(() => {
        if(Object.keys(signup_result).length != 0) {
            console.log('Result ===>'+JSON.stringify(signup_result));
            if(signup_result.status == 'error') {
                toast.error(signup_result.message, {theme: "colored"});
            } else if(signup_result.status == 'success') {
                toast.success(signup_result.message, {theme: "colored"});
                //history.push("/home");
            }
        }
    },[signup_result])


    

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password:'',
        dob: '',
        mobile_number: '',
        std_code:'',
        phone_number: '',
        telephone_number: '',
        address: '',
        user_type:3
    };

    const validationSchema = Yup.object({
        first_name: Yup.string()
            .max(50, 'First name must be 50 characters or less')
            .required('First name is required'),
        last_name: Yup.string()
            .max(50, 'Last name must be 50 characters or less')
            .required('Last name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email required'),
        password: Yup.string()
            .required('Password is required'),
        confirm_password:Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        dob: Yup.date('DOB is date'),
        mobile_number: Yup.string().matches(/^\d{10}$/, 'Invalid mobile number')
            .min(10, 'Invalid mobile number')
            .max(10,'Invalid mobile number')
            .required('Mobile number is required'),
        std_code:Yup.string().matches(/^\d{4}$/, 'Invalid STD code')
            .min(3, 'Invalid STD code')
            .max(4,'Invalid STD code'),
        phone_number: Yup.string().matches(/^\d{4}$/, 'Invalid telephone number')
            .min(3, 'Invalid telephone number')
            .max(4,'Invalid telephone number'),
        telephone_number: Yup.number(),
        address: Yup.string()
            .required('Address is required'),
        user_type:Yup.number()
            .required('User type is required'),
    });

    const onDobDateChange = (e, field, values, setFieldValue) => {
        console.log(e.getDate(), e.getFullYear(), e.getMonth());
        var dobDate = e.getFullYear()+'-'+(e.getMonth() + 1)+'-'+e.getDate();
        console.log(dobDate);
        setFieldValue(field, dobDate);
    };

    const onSubmit = async (values) => {
        console.log(values, userState, props);
        dispatch({type:SIGNUP_FORM, payload: values});
        await props.register();
        
    };

    return (
        <section id="signup">
            {userState.user_loader == true ? <Loader /> : <div>
                <h3 className="text-center">Signup Page</h3>
                <div className="container">
                    <Formik initialValues={initialValues} /* validationSchema={validationSchema}  */onSubmit={onSubmit}>
                        {({ errors, values, field, touched, setValues, setFieldValue, handleChange, handleBlur }) => (
                            <Form>                        
                                <pre>
                                    {JSON.stringify(values)}
                                </pre>
                                <div className="mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <input type="text" className={'form-control' + (errors.first_name && touched.first_name ? ' is-invalid' : '')} id="first_name" name="first_name" placeholder="Enter your first name" onChange={handleChange} onBlur={handleBlur} value={values.first_name}  />
                                    <ErrorMessage name="first_name" component="span" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <input type="text" className={'form-control' + (errors.last_name && touched.last_name ? ' is-invalid' : '')} id="last_name" name="last_name" placeholder="Enter your last name" onChange={handleChange} onBlur={handleBlur} value={values.last_name} />
                                    <ErrorMessage name="last_name" component="span" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} id="email" name="email" placeholder="Enter your email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                    <ErrorMessage name="email" component="span" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} id="password" name="password" placeholder="Enter your password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                    <ErrorMessage name="password" component="span" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                                    <input type="password" className={'form-control' + (errors.confirm_password && touched.confirm_password ? ' is-invalid' : '')} id="confirm_password" name="confirm_password" placeholder="Re-enter password" onChange={handleChange} onBlur={handleBlur} value={values.confirm_password} />
                                    <ErrorMessage name="confirm_password" component="span" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dob" className="form-label">DOB</label>
                                    {/* <input type="text" className="form-control" id="dob" name="dob" placeholder="Enter your DOB" onChange={handleChange} onBlur={handleBlur} /> */}
                                    <div>
                                        <DatePicker id="dob" className={'form-control' + (errors.dob && touched.dob ? ' is-invalid' : '')} name="dob" maxDate={subYears(new Date(), 17)} onChange={e => onDobDateChange(e, 'dob', values, setFieldValue)} value={values.dob} />
                                    </div>
                                    <ErrorMessage name="dob" component="span" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                                    <input type="text" className={'form-control' + (errors.mobile_number && touched.mobile_number ? ' is-invalid' : '')} id="mobile_number" name="mobile_number" placeholder="Enter your Mobile number" onChange={handleChange} onBlur={handleBlur} value={values.mobile_number} />
                                    <ErrorMessage name="mobile_number" component="span" className="text-danger" />
                                </div>
                                <div className="row g-3 align-items-center">
                                    <div className="col-md-12">
                                        Telephone Number
                                    </div>
                                    <div className="col-auto">
                                        <label htmlFor="std_code" className="">STD Code</label>
                                        <input type="text" className={'form-control'} id="std_code" name="std_code" placeholder="Enter STD code" onChange={handleChange} onBlur={handleBlur} value={values.std_code} />
                                        <ErrorMessage name="std_code" component="span" className="text-danger" />
                                    </div>
                                    <div className="col-auto">
                                        <label htmlFor="phone_number" className="">Phone Number</label>
                                        <input type="text" className={'form-control'} id="phone_number" name="phone_number" placeholder="Enter phone number" onChange={handleChange} onBlur={handleBlur} value={values.phone_number} />
                                        <ErrorMessage name="phone_number" component="span" className="text-danger" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <textarea className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} id="address" name="address" placeholder="Enter address" rows="3" onChange={handleChange} onBlur={handleBlur} value={values.address}></textarea>
                                    <ErrorMessage name="address" component="span" className="text-danger" />
                                </div>
                                <div className="mb-2">
                                    User Type
                                    <ErrorMessage name="user_type" component="span" className="text-danger" />
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="user_type" id="user_type_tenant" value="3"  onChange={handleChange} onBlur={handleBlur} checked={values.user_type == 3 ? true : false} />
                                    <label className="form-check-label" htmlFor="user_type_tenant">Tenant</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="user_type" id="user_type_owner" value="2" onChange={handleChange} onBlur={handleBlur} checked={values.user_type == 2 ? true : false} />
                                    <label className="form-check-label" htmlFor="user_type_owner">Owner</label>
                                </div>
                                <div className="mt-2 text-right">
                                    <button type="submit" className="btn btn-primary">Signup</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            }
        </section>
    );
}

export default connect(null, mapDispatchToProps)(Signup);