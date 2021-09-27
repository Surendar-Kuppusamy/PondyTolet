import asyncHandler from 'express-async-handler'
import validator from 'express-validator';
import  Users from '../models/UserModel.js';
import { logger } from '../config/configLoggers.js';
import { userValidationSchema,  customValidationResult } from '../middleware/validationSchemas.js';

const { checkSchema, validationResult } = validator;

const register = asyncHandler(async(req, res, next) => {
    console.log(formValues)
})

const signup = asyncHandler(async(req, res, next) => {
	const validationResultError = customValidationResult(req).array();
	if(validationResultError) {
		console.log('Validation-Error===>'+JSON.stringify(validationResultError));
		res.status(200).json(validationResultError[0]);
	} else {
		let userDetails = req.body;
		let date = new Date();
		let curDate = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
		let telephoneNumber = userDetails.std_code + ' - ' +userDetails.telephone_number;

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
			res.status(404);
			throw new Error('Something went wrong');
		}
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

const demo = asyncHandler(async(req, res, next) => {
	res.json({'errors': 'Find'});
})

export { register, signup, test, demo}