import validator from 'express-validator';
import Users from '../models/UserModel.js';
import Cities from '../models/CityModel.js';
import States from '../models/StateModel.js';
import WhoCanContactUs from '../models/WhoCanContactUsModel.js';

const { validationResult, checkSchema } = validator;

export const customValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            status: 'error',
            message: error.msg,
            params:error.param
        };
    },
});


export const userValidationSchema = {
    first_name: {
        trim: true,
        notEmpty: {
            errorMessage: "First name is required."
        },
        isAlphanumeric: {
            errorMessage: "First name should be alpha numeric."
        },
        isLength: {
            options: {
                min: 3,
                max: 50
            },
            errorMessage: "First name characters must be greater then 2 and less then 50"
        }
    },
    last_name: {
        trim: true,
        notEmpty: {
            errorMessage: "Last name is required."
        },
        isAlphanumeric: {
            errorMessage: "Last name should be alpha numeric."
        },
        isLength: {
            options: {
                min: 3,
                max: 50
            },
            errorMessage: "Last name characters must be greater then 2 and less then 50"
        }
    },
    email: {
        trim: true,
        notEmpty: {
            errorMessage: "Email is required."
        },
        isEmail: {
            errorMessage: "Invalid email address."
        },
        custom: {
            options: value => {
                return Users.find({
                    email: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email address already taken')
                    } else {
                        return Promise.resolve(true);
                    }
                })
            }
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: "Password is required."
        },
        isLength: {
            options: {
                min: 6,
                max: 50
            },
            errorMessage: "Password characters must be greater then 6 and less then 50"
        }
    },
    confirm_password: {
        trim: true,
        notEmpty: {
            errorMessage: "Confirm password is required."
        },
        isLength: {
            options: {
                min: 6,
                max: 50
            },
            errorMessage: "Confirm Password characters must be greater then 6 and less then 50"
        },
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.password != value) {
                    return Promise.reject('Password and confirm password should be match');
                } else {
                    return Promise.resolve(true);
                }
            }
        }
    },
    dob: {
        trim: true,
        isDate: {
            options: {
                format: 'YYYY-MM-DD',
                delimiters: ['/', '-']
            },
            errorMessage: "DOB date is invalid."
        },
        isBefore: {
            date: new Date(),
            errorMessage: "DOB date should not be current or future dates."
        }
    },
    mobile_number: {
        trim: true,
        //toInt: true,
        /* customSanitizer: {
            options: (value, { req, location, path }) => {
                let sanitizedValue;
                sanitizedValue = parseInt(value);
                return sanitizedValue;
            }
        }, */
        /* isNumeric: {
            errorMessage: "Mobile number should be numeric."
        }, */
        isLength: {
            options: {
                min: 10
            },
            errorMessage: "Mobile number should be 10 digits."
        },
        isLength: {
            options: {
                max: 10
            },
            errorMessage: "Mobile number should be 10 digits."
        }
    },
    std_code: {
        trim: true,
        /* isNumeric: {
            errorMessage: "STD code number should be numeric."
        }, */
        /* isLength: {
            options: {
                min: 3,
                max: 5  
            },
            errorMessage: "STD code should be between 3 to 5 digits."
        } */
    },
    telephone_number: {
        trim: true,
        /* isNumeric: {
            errorMessage: "Telephone number should be numeric."
        }, */
        /* isLength: {
            options: {
                min: 6,
                max: 10
            },
            errorMessage: "Telephone number should be between 6 to 10 digits."
        } */
    },
    address: {
        trim: true,
        notEmpty: {
            errorMessage: "Address is required."
        },
        isLength: {
            options: { min: 30, max: 50000 },
            errorMessage: 'Address should be at least 30 characters.'
        }
    },
    user_type: {
        trim: true,
        notEmpty: {
            errorMessage: "User Type is required."
        },
        isNumeric: {
            errorMessage: "User type should be numeric."
        }
    }
}

export const assetValidationSchema = {
    type_of_asset: {
        trim: true,
        notEmpty: {
            errorMessage: "Asset type is required."
        },
        isInt: {
            errorMessage: "Asset type should be numeric."
        }
    },
    asset_for: {
        trim: true,
        notEmpty: {
            errorMessage: "Asset for is required."
        },
        isInt: {
            errorMessage: "Asset for should be numeric."
        }
    },
    asset_name: {
        trim: true,
        notEmpty: {
            errorMessage: "Asset name is required."
        },
        isAlphanumeric: {
            errorMessage: "Asset name should be alpha numeric."
        },
        isLength: {
            options: {
                min: 3,
                max: 50
            },
            errorMessage: "Asset name characters must be greater then 3 and less then 50"
        }
    },
    door_number: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.type_of_asset != 5 && req.body.type_of_asset != 3 && req.body.type_of_asset  != 4) {
                    if(value == 0) {
                        return Promise.reject('Door number required.');
                    } else if (value < 1) {
                        return Promise.reject('Invalid door number.');
                    } else {
                        return Promise.resolve(true);
                    }
                } else {
                    return Promise.resolve(true);
                }
            }
        }
    },
    address_hint: {
        trim: true
    },
    street: {
        trim: true
    },
    nagar: {
        trim: true
    },
    city: {
        trim: true,
        isInt: {
            options: { min: 1 },
            errorMessage: "City is required."
        }
    },
    state: {
        trim: true,
        isInt: {
            options: { min: 1 },
            errorMessage: "State is required."
        }
    },
    pincode: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(value == 0) {
                    return Promise.reject('Pincode required.');
                } else if(value.length == 6) {
                    return Promise.reject('Pincode must be 6 digits.');
                } else {
                    return Promise.resolve(true);
                }
            }
        }
    },
    landmark: {
        trim: true
    },
    number_of_rooms: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.type_of_asset == 1 || req.body.type_of_asset == 2) {
                    if(value == 0) {
                        return Promise.reject('Number of rooms required.');
                    } else if(value < 1) {
                        return Promise.reject('Invalid number of rooms.');
                    } else if(value > 20) {
                        return Promise.reject('Invalid number of rooms.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    bhk: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.type_of_asset == 1 || req.body.type_of_asset == 2) {
                    if(value == 0) {
                        return Promise.reject('BHK required.');
                    } else if(value < 1) {
                        return Promise.reject('Invalid BHK value.');
                    } else if(value > 20) {
                        return Promise.reject('Invalid BHK value.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    age_of_asset: {
        trim: true
    },
    age_of_asset_type: {
        trim: true
    },
    asset_main_image: {
        trim: true
    },
    asset_size_in_length_type: {
        trim: true
    },
    asset_size_in_length: {
        trim: true
    },
    asset_size_in_width_type: {
        trim: true
    },
    asset_size_in_width: {
        trim: true
    },
    asset_notes_by_owner: {
        trim: true
    },
    who_can_contact: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(typeof value != array) {
                    return Promise.reject('Who can contact value should be array.');
                } else if(value.length == 0) {
                    return Promise.reject('Select atleast one of the value on "Who can oontact".');
                } else {
                    return Promise.resolve(true);
                }
            }
        }
    },
    advance_amount_for_asset: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.asset_for != 1) {  //1 => 'Rent'
                    if(value == 0) {
                        return Promise.reject('Advance amount required.');
                    } else if(value < 100) {
                        return Promise.reject('Invalid advance amount required.');
                    } else if(value > 5000000) {
                        return Promise.reject('Invalid advance amount required.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    monthly_rent_for_asset: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.asset_for == 1) {  //1 => 'Rent'
                    if(value == 0) {
                        return Promise.reject('Monthly rent required.');
                    } else if(value < 100) {
                        return Promise.reject('Invalid monthly rent.');
                    } else if(value > 500000) {
                        return Promise.reject('Invalid monthly rent.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    lease_amount_for_asset: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.asset_for == 2) {  //2 => 'Lease'
                    if(value == 0) {
                        return Promise.reject('Lease amount required.');
                    } else if(value < 100) {
                        return Promise.reject('Invalid lease amount.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    lease_period_for_asset: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.asset_for == 2) {  //2 => 'Lease'
                    if(value == 0) {
                        return Promise.reject('Lease period required.');
                    } else if(value < 1) {
                        return Promise.reject('Invalid lease period.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    lease_period_for_asset_type: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.asset_for == 2) {  //2 => 'Lease'
                    if(value == 0) {
                        return Promise.reject('Lease period type required.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    asset_price: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.asset_for == 3) {  //3 => 'Sale'
                    if(value == 0) {
                        return Promise.reject('Asset price required.');
                    } else if(value < 100) {
                        return Promise.reject('Invalid asset price.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    asset_available_on_from: {
        trim: true,
        notEmpty: {
            errorMessage: "Asset available date is required."
        },
        isDate: {
            options: { format: 'YYYY-MM-DD' },
            errorMessage: "Asset available date should be valid."
        }
    },
    notice_period_for_vocate_asset: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.asset_for == 1) {  //1 => 'Rent'
                    if(value == 0) {
                        return Promise.reject('Notice period for vocate asset is required.');
                    } else if(value < 1) {
                        return Promise.reject('Invalid notice period for vocate asset.');
                    } else if(!Number.isInteger(value)) {
                        return Promise.reject('Notice period for vocate asset should be numeric.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    notice_period_for_vocate_asset_type: {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.asset_for == 1) {  //1 => 'Rent'
                    if(value == 0) {
                        return Promise.reject('Notice period type for vocate asset is required.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    },
    asset_status_now: {
        trim: true,
        isInt: {
            options: {
                min: 1,
                max:5
            },
            errorMessage: "Asset state is required."
        }
    },
    show_my_asset_for_tenants: {
        trim: true,
        notEmpty: {
            errorMessage: "Show my asset for tenants is required."
        },
    },
    'rooms.*.room_name': {
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.type_of_asset == 1 || req.body.type_of_asset == 2) {    //1 => 'House', 2 => 'Appartment'
                    if(value == '') {
                        return Promise.reject('Room name required.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    }
}

export const loginValidationSchema = {
    'cities.*': {
        trim: true,
        custom: {
            options: (value, { req, location, path }) => {
                if(req.body.type_of_asset == 1 || req.body.type_of_asset == 2) {    //1 => 'House', 2 => 'Appartment'
                    if(value == '') {
                        return Promise.reject('Any one of the city is required.');
                    } else if(value.length < 3) {
                        return Promise.reject('Any one of the city length is less than three characters.');
                    } else {
                        return Promise.resolve(true);
                    }
                }
            }
        }
    }
}


export const createCityValidationSchema = {
    email: {
        trim: true,
        notEmpty: {
            errorMessage: "Email is required."
        },
        isEmail: {
            errorMessage: "Invalid email address."
        },
        custom: {
            options: (value, { req, location, path }) => {
                return Users.find({
                    email: value,
                    password: req.body.password
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.resolve(true);
                    } else {
                        return Promise.reject('Invalid credential.');
                    }
                })
            }
        }
    },
    password: {
        trim: true,
        notEmpty: {
            errorMessage: "Password is required."
        },
        isLength: {
            options: {
                min: 6,
                max: 50
            },
            errorMessage: "Password characters must be greater then 6 and less then 50"
        }
    }
}

export const bulkDataValidationSchema = {
    'bulk_data.*': {
        trim: true,
        notEmpty: {
            errorMessage: "Name required."
        },
        isLength: {
            options: {
                min: 3
            },
            errorMessage: "Length must be greater or equal to 3 characters."
        },
        isLength: {
            options: {
                max: 100
            },
            errorMessage: "Length must be less or equal to 100 characters."
        }
    }
}

export const createSingleOptionValidationSchema = {
    option: {
        trim: true,
        notEmpty: {
            errorMessage: "Name required."
        },
        isLength: {
            options: {
                min: 3
            },
            errorMessage: "Length must be greater or equal to 3 characters."
        },
        isLength: {
            options: {
                max: 100
            },
            errorMessage: "Length must be less or equal to 100 characters."
        }
    }
}

export const editCityValidationSchema = {
    city_name: {
        trim: true,
        notEmpty: {
            errorMessage: "City required."
        },
        isLength: {
            options: {
                min: 3
            },
            errorMessage: "City length must be greater or equal to 3 characters."
        },
        isLength: {
            options: {
                max: 100
            },
            errorMessage: "City length must be less or equal to 100 characters."
        },
        custom: {
            options: (value, { req, location, path }) => {
                return Cities.find({
                        $and: [
                            {city_name: value},
                            {_id: { $ne: req.body.id }}
                        ]
                }).then(city => {
                    if (city.length > 0) {
                        return Promise.reject('City already available.');
                    } else {
                        return Promise.resolve(true);
                    }
                })
            }
        }
    }
}

export const editStateValidationSchema = {
    state_name: {
        trim: true,
        notEmpty: {
            errorMessage: "State required."
        },
        isLength: {
            options: {
                min: 3
            },
            errorMessage: "State length must be greater or equal to 3 characters."
        },
        isLength: {
            options: {
                max: 100
            },
            errorMessage: "State length must be less or equal to 100 characters."
        },
        custom: {
            options: (value, { req, location, path }) => {
                return States.find({
                        $and: [
                            {state_name: value},
                            {_id: { $ne: req.body.id }}
                        ]
                }).then(state => {
                    if (state.length > 0) {
                        return Promise.reject('State is already available.');
                    } else {
                        return Promise.resolve(true);
                    }
                })
            }
        }
    }
}



export const editTenantValidationSchema = {
    tenant_type: {
        trim: true,
        notEmpty: {
            errorMessage: "Tenant type is required."
        },
        isLength: {
            options: {
                min: 3
            },
            errorMessage: "Tenant type length must be greater or equal to 3 characters."
        },
        isLength: {
            options: {
                max: 100
            },
            errorMessage: "Tenant type length must be less or equal to 100 characters."
        },
        custom: {
            options: (value, { req, location, path }) => {
                return WhoCanContactUs.find({
                        $and: [
                            {tenant_type: value},
                            {_id: { $ne: req.body.id }}
                        ]
                }).then(tenant => {
                    if (tenant.length > 0) {
                        return Promise.reject('Tenant type is already available.');
                    } else {
                        return Promise.resolve(true);
                    }
                })
            }
        }
    }
}