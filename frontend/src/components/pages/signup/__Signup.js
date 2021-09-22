import React, {useState, useEffect} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Signup() {
    const formik = useFormik({
        initialValues: {
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
        },
        validationSchema: Yup.object({
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
        }),
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <section id="signup">
            <h3 className="text-center">Signup Page</h3>
            <div className="container">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="first_name" name="first_name" placeholder="Enter your first name" {...formik.getFieldProps('first_name')}  />
                        {formik.touched.first_name && formik.errors.first_name ? (<span className="text-danger">{formik.errors.first_name}</span>) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Enter your last name" {...formik.getFieldProps('last_name')} />
                        {formik.touched.last_name && formik.errors.last_name ? (<span className="text-danger">{formik.errors.last_name}</span>) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (<span className="text-danger">{formik.errors.email}</span>) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password ? (<span className="text-danger">{formik.errors.password}</span>) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Re-enter password" {...formik.getFieldProps('confirm_password')} />
                        {formik.touched.confirm_password && formik.errors.confirm_password ? (<span className="text-danger">{formik.errors.confirm_password}</span>) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">DOB</label>
                        <input type="text" className="form-control" id="dob" name="dob" placeholder="Enter your DOB" {...formik.getFieldProps('dob')} />
                        {formik.touched.dob && formik.errors.dob ? (<span className="text-danger">{formik.errors.dob}</span>) : null}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                        <input type="text" className="form-control" id="mobile_number" name="mobile_number" placeholder="Enter your Mobile number" {...formik.getFieldProps('mobile_number')} />
                        {formik.touched.mobile_number && formik.errors.mobile_number ? (<span className="text-danger">{formik.errors.mobile_number}</span>) : null}
                    </div>
                    <div className="row g-3 align-items-center">
                        <div className="col-md-12">
                            Telephone Number
                        </div>
                        <div className="col-auto">
                            <label htmlFor="std_code" className="">STD Code</label>
                            <input type="text" className="form-control" id="std_code" name="std_code" placeholder="Enter STD code" {...formik.getFieldProps('std_code')} />
                            {formik.touched.std_code && formik.errors.std_code ? (<span className="text-danger">{formik.errors.std_code}</span>) : null}
                        </div>
                        <div className="col-auto">
                            <label htmlFor="phone_number" className="">Phone Number</label>
                            <input type="text" className="form-control" id="phone_number" name="phone_number" placeholder="Enter phone number" {...formik.getFieldProps('phone_number')} />
                            {formik.touched.phone_number && formik.errors.phone_number ? (<span className="text-danger">{formik.errors.phone_number}</span>) : null}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <textarea className="form-control" id="address" name="address" placeholder="Enter address" rows="3"  {...formik.getFieldProps('address')}></textarea>
                        {formik.touched.address && formik.errors.address ? (<span className="text-danger">{formik.errors.address}</span>) : null}
                    </div>
                    <div className="mb-2">
                        User Type
                        {formik.touched.user_type && formik.errors.user_type ? (<span className="text-danger">{formik.errors.user_type}</span>) : null}
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="user_type" id="user_type_tenant" value="3" {...formik.getFieldProps('phone_number')} />
                        <label className="form-check-label" htmlFor="user_type_tenant">Tenant</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="user_type" id="user_type_owner" value="2" {...formik.getFieldProps('phone_number')} />
                        <label className="form-check-label" htmlFor="user_type_owner">Owner</label>
                    </div>
                    <div className="mt-2 text-right">
                        <button type="submit" className="btn btn-primary">Signup</button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Signup;