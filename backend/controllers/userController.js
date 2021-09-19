import asyncHandler from 'express-async-handler'
import validator from 'express-validator';
import  Users from '../models/UserModel.js';
import {logger} from '../config/configLoggers.js'

const { validationResult } = validator;

const register = asyncHandler(async(req, res, next) => {
    console.log(formValues)
})


const signup = asyncHandler(async(req, res, next) => {
    console.log(JSON.stringify(req.body));
    let userDetails = req.body;
    let date = new Date();
    let curDate = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
    let telephoneNumber = userDetails.std_code + ' - ' +userDetails.telephone_number

    let userData = {
        first_name: userDetails.first_name,
        last_name:userDetails.last_name,
        dob: userDetails.dob,
        email: userDetails.email,
        password: userDetails.password,
        mobile_number: userDetails.mobile_number,
        telephone_number: telephoneNumber,
        address: userDetails.address,
        profile_image: '',
        user_type: userDetails.user_type,
        user_status: 1,
        created_on: curDate,
        modified_on: ''
    }

    const user = await Users.create(userData);

    if(user) {
        res.status(201).json({
            status: 'success',
            message: 'User created',
            user: user
        });
    } else {
        res.status(400).json({
            status: 'error',
            message: 'Something went wrong'
        })
    }
})


const test = asyncHandler(async(req, res, next) => {
  console.log(req.params.id);
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    logger.info('Test')
    res.json({errors: errors.array()});
    
  } else {
    res.send('Success');
  }
})

export { register, signup, test}