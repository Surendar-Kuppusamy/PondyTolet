import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';

function Login() {
    console.log('Test', process.env.REACT_APP_TITLE);
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    const initialValues = {
        email: '',
        password: '',
        selectValue:''
    };

    const onSelectChange = (e, field, values, setFieldValue) => {
        setFieldValue(field, e.value);
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
        password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must have 8 characters')
                .max(50, 'Password must be less than 50 characters')
    });
    
    const onSubmit = (values) => {
        console.log(values);
    }
    
    return (
        <section id="login">
            <h3>Login Page {process.env.REACT_APP_TITLE}</h3>
            <div className="container">
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {({ errors, values, touched, setValues, setFieldValue, handleChange, handleBlur }) => (
                        <Form>
                            <pre>{JSON.stringify(values)}</pre>
                            <div className="container">
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
                                    <Select className="basic-single" classNamePrefix="select" id="selectValue" name="selectValue" options={options} onChange={e => onSelectChange(e, 'selectValue', values, setFieldValue)} defaultValue={values.selectValue} />
                                </div>
                                
                                <div className="mt-3 text-right">
                                    <button className="btn btn-primary" type="submit">Login</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}

export default Login;