import React, {useState, useEffect} from 'react';

function Signup() {
    const [signupForm, setSignupForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password:'',
        dob: '',
        mobile_number: 0,
        std_code:0,
        phone_number: 0,
        telephone_number: '',
        address: '',
        user_type:3
    });
    
    useEffect(() => {    
        console.log(signupForm.first_name);
    }, [signupForm.first_name]);
    
    const handleOnChangeInput = (event) => {
        setSignupForm((values) => ({
            ...values,
            [event.target.name]: event.target.value
        }));
    }
    
    const submitSignupForm = (event) => {
        event.preventDefault();
        console.log(signupForm);
    }
    
    return (
        <section id="signup">
            <h3 className="text-center">Signup Page</h3>
            <div className="container">
                <form onSubmit={submitSignupForm}>
                    <div className="mb-3">
                        <label htmlFor="first_name" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="first_name" name="first_name" placeholder="Enter your first name" value={signupForm.first_name} onChange={handleOnChangeInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="last_name" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="last_name" name="last_name" placeholder="Enter your last name" value={signupForm.last_name} onChange={handleOnChangeInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="text" className="form-control" id="email" name="email" placeholder="Enter your email" value={signupForm.email}  onChange={handleOnChangeInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" value={signupForm.password} onChange={handleOnChangeInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Re-enter password" value={signupForm.confirm_password} onChange={handleOnChangeInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className="form-label">DOB</label>
                        <input type="text" className="form-control" id="dob" name="dob" placeholder="Enter your DOB" value={signupForm.dob}  onChange={handleOnChangeInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
                        <input type="text" className="form-control" id="mobile_number" name="mobile_number" placeholder="Enter your Mobile number" value={signupForm.mobile_number} onChange={handleOnChangeInput} />
                    </div>
                    <div className="row g-3 align-items-center">
                        <div className="col-md-12">
                            Telephone Number
                        </div>
                        <div className="col-auto">
                            <label htmlFor="std_code" className="">STD Code</label>
                            <input type="text" className="form-control" id="std_code" name="std_code" placeholder="Enter STD code" value={signupForm.std_code}  onChange={handleOnChangeInput} />
                        </div>
                        <div className="col-auto">
                            <label htmlFor="phone_number" className="">Phone Number</label>
                            <input type="text" className="form-control" id="phone_number" name="phone_number" placeholder="Enter phone number" value={signupForm.phone_number} onChange={handleOnChangeInput} />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <textarea className="form-control" id="address" name="address" placeholder="Enter address" rows="3"  value={signupForm.address}  onChange={handleOnChangeInput}></textarea>
                    </div>
                    <div className="mb-2">
                        User Type
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="user_type" id="user_type_tenant" value="3" />
                        <label className="form-check-label" htmlFor="user_type_tenant">Tenant</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="user_type" id="user_type_owner" value="2" />
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