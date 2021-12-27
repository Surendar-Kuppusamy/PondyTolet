import asyncHandler from 'express-async-handler'
import  Cities from '../models/CityModel.js';
import { logger } from '../config/configLoggers.js';
import { customValidationResult } from '../middleware/validationSchemas.js';
import { getUserId } from '../middleware/authMiddleware.js';
import Users from '../models/UserModel.js';
import States from '../models/StateModel.js';
import WhoCanContactUs from '../models/WhoCanContactUsModel.js';


export const signup = asyncHandler(async(req, res, next) => {
	const validationResultError = customValidationResult(req).array();
	if(validationResultError.length > 0) {
		console.log('Validation-Error===>'+JSON.stringify(validationResultError));
		res.status(200).json(validationResultError[0]);
	} else {
		let userDetails = req.body;
		let date = new Date();
		let curDate = date.getFullYear()+'-'+(date.getMonth() + 1)+'-'+date.getDate();
		//let telephoneNumber = userDetails.std_code + ' - ' +userDetails.telephone_number;

		let userData = {
			first_name: userDetails.first_name,
			last_name:userDetails.last_name,
			dob: userDetails.dob,
			email: userDetails.email,
			password: userDetails.password,
			mobile_number: userDetails.mobile_number,
			std_code: userDetails.std_code,
			telephone_number: userDetails.telephone_number,
			address: userDetails.address,
			profile_image: '',
			user_type: userDetails.user_type,
			user_status: 1,
			created_on: date,
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

export const usersList = asyncHandler(async(req, res, next) => {
	const users = await Users.find();
	res.status(201).json({
		status: 'success',
		message: 'User list',
		users: users
	});
});

export const bulkDataInsert = asyncHandler(async(req, res, next) => {
	const validationResultError = customValidationResult(req).array();
	if(validationResultError.length > 0) {
		console.log('Validation-Error===>'+JSON.stringify(validationResultError));
		res.status(200).json(validationResultError[0]);
	} else {
		let user_id = await getUserId(req);

		if(req.body.field == 1){
			const matchedCities = await Cities.aggregate([
				{$match: { city_name: {$in: req.body.bulk_data}}},
				{ $group: { _id: null, cities: {$push: "$city_name"} } },
				{$project: { _id: 0, cities: 1}}
			]);

			if(matchedCities.length > 0) {
				res.status(200).json({
					status: 'success',
					message: 'This "'+matchedCities[0].cities.join(", ")+'" cities is already exists.',
					data: matchedCities
				});
			} else {
				let bulk_data = req.body.bulk_data.map((value) => { return {city_name: value, status: 1, created_by: user_id, created_on: new Date() } });
				Cities.insertMany(bulk_data, function(err) {
					if(err) {
						res.status(200).json({
							status: 'error',
							message: err.message,
							data: bulk_data
						});
					} else {
						res.status(200).json({
							status: 'success',
							message: 'Cities inserted.'
						});
					}
				});
			}
		} else if(req.body.field == 2) {
			const matchedStates = await States.aggregate([
				{$match: { state_name: {$in: req.body.bulk_data}}},
				{ $group: { _id: null, states: {$push: "$state_name"} } },
				{$project: { _id: 0, states: 1}}
			]);

			if(matchedStates.length > 0) {
				res.status(200).json({
					status: 'success',
					message: 'This "'+matchedStates[0].states.join(", ")+'" states is already exists.',
					data: matchedStates
				});
			} else {
				let bulk_data = req.body.bulk_data.map((value) => { return {state_name: value, status: 1, created_by: user_id, created_on: new Date()} });
				States.insertMany(bulk_data, function(err) {
					if(err) {
						res.status(200).json({
							status: 'error',
							message: err.message,
							data: bulk_data
						});
					} else {
						res.status(200).json({
							status: 'success',
							message: 'States inserted'
						});
					}
				});
			}
		} else {
			const matchedContacus = await WhoCanContactUs.aggregate([
				{$match: { tenant_type: {$in: req.body.bulk_data}}},
				{ $group: { _id: null, tenants: {$push: "$tenant_type"} } },
				{$project: { _id: 0, tenants: 1}}
			]);

			if(matchedContacus.length > 0) {
				res.status(200).json({
					status: 'success',
					message: 'This "'+matchedContacus[0].tenants.join(", ")+'" tenants is already exists.',
					data: matchedContacus
				});
			} else {
				let bulk_data = req.body.bulk_data.map((value) => { return {tenant_type: value, status: 1, created_by: user_id, created_on: new Date() } });
				WhoCanContactUs.insertMany(bulk_data, function(err) {
					if(err) {
						res.status(200).json({
							status: 'error',
							message: err.message,
							data: bulk_data
						});
					} else {
						res.status(200).json({
							status: 'success',
							message: 'Tenant type is inserted.'
						});
					}
				});
			}
		}	
	}
});


export const createSingleOption = asyncHandler(async(req, res, next) => {
	const validationResultError = customValidationResult(req).array();
	if(validationResultError.length > 0) {
		console.log('Validation-Error===>'+JSON.stringify(validationResultError));
		res.status(200).json(validationResultError[0]);
	} else {
		let user_id = await getUserId(req);

		if(req.body.field == 1){
			const matchedCities = await Cities.aggregate([
				{$match: { city_name: req.body.option}},
				{$project: { _id: 0, cities: 1}}
			]);

			if(matchedCities.length > 0) {
				res.status(200).json({
					status: 'success',
					message: 'This "'+matchedCities[0].cities+'" city is already exists.',
					data: matchedCities
				});
			} else {
				Cities.create({ city_name: req.body.option}, function(err, result) {
					if(err) {
						res.status(200).json({
							status: 'error',
							message: err.message,
							data: req.body.option
						});
					} else {
						res.status(200).json({
							status: 'success',
							message: 'City inserted.',
							result: result
						});
					}
				});
			}

			
		} else if(req.body.field == 2) {
			const matchedStates = await States.aggregate([
				{$match: { state_name: req.body.option}},
				{$project: { _id: 0, states: 1}}
			]);

			if(matchedStates.length > 0) {
				res.status(200).json({
					status: 'success',
					message: 'This "'+matchedStates[0].states+'" state is already exists.',
					data: matchedStates
				});
			} else {
				States.create({ state_name: req.body.option}, function(err) {
					if(err) {
						res.status(200).json({
							status: 'error',
							message: err.message,
							data: req.body.option
						});
					} else {
						res.status(200).json({
							status: 'success',
							message: 'State inserted.'
						});
					}
				});
			}
		} else {
			const matchedContacus = await WhoCanContactUs.aggregate([
				{$match: { tenant_type: req.body.option}},
				{$project: { _id: 0, tenants: 1}}
			]);

			if(matchedContacus.length > 0) {
				res.status(200).json({
					status: 'success',
					message: 'This "'+matchedContacus[0].tenants+'" tenant is already exists.',
					data: matchedContacus
				});
			} else {
				WhoCanContactUs.create({ tenant_type: req.body.option}, function(err) {
					if(err) {
						res.status(200).json({
							status: 'error',
							message: err.message,
							data: req.body.option
						});
					} else {
						res.status(200).json({
							status: 'success',
							message: 'Tenant type is inserted'
						});
					}
				});
			}
		}	
	}
});

export const getOptions = asyncHandler(async(req, res, next) => {
	const options = await Cities.aggregate([
		{
			$project: {
				value:"$_id",
				label:"$city_name",
				option_type: "city_options"
			}
		},
		{
			$unionWith: {
				coll: "states",
				pipeline: [
					{
						$project: {
							value: "$_id",
							label: "$state_name",
							option_type: "state_options"
						}
					},
				]
			}
		},
		{
			$unionWith: {
				coll: "whocancontactus",
				pipeline: [
					{
						$project: {
							value: "$_id",
							label: "$tenant_type",
							option_type: "who_can_contact_options"
						}
					}
				]
			}
		},
		{
			$group: {
				_id: "$option_type",
				options: {
					$push: {
						value: "$value",
						label: "$label"
					}
				}
			}
		}
	]);
	res.status(200).json({
		status: 'success',
		message: 'Options',
		data: options
	});
});