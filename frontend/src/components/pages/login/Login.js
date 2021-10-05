import React, { useEffect } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { login } from '../../../actions/userActions';
import { LOGIN_FORM, LOGIN_FORM_RESULT } from '../../../constants/constants';

function Login(props) {
    let location = useLocation();
    let history = useHistory();
    const userState = useSelector((state) => state.userState);
    const { login_form_result } = userState;
    const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
        password: Yup.string()
                .required('Password is required')
                .min(6, 'Password must have 8 characters')
                .max(50, 'Password must be less than 50 characters')
    });
    
    const onSubmit = (values) => {
        dispatch({type: LOGIN_FORM, payload: values });
        props.login();
    }

    useEffect(() => {
        if(login_form_result != undefined && Object.keys(login_form_result).length > 0) {
            console.log('Result ===>'+login_form_result);
            if(login_form_result.status == 'error') {
                dispatch({type: LOGIN_FORM_RESULT, payload: {}});
                toast.error(login_form_result.message, {theme: "colored"});
            } else {
                dispatch({type: LOGIN_FORM_RESULT, payload: {}});
                toast.success(login_form_result.message, {theme: "colored"});
                localStorage.setItem("token", login_form_result.token);
                history.push("/home");
            }
        }
    },[login_form_result])
    
    return (
        <section id="login">
            <h3>Login Page</h3>
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

const mapDispatchToProps = dispatch => {
    return {
        login: () => {
            dispatch(login())
        }
    }
}

export default connect(null, mapDispatchToProps)(Login);