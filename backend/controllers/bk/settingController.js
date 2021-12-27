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


//Start: City List

export const getCities = asyncHandler(async(req, res, next) => {
	let cond = {};
	let keyword = req.body.keyword;
	let skip = req.body.skip;
	let limit = req.body.limit;
	if(keyword != "") {
		cond = {city_name: new RegExp(keyword, 'i')};
	}
	let totalCount = await Cities.count(cond);
	let cities = await Cities.aggregate([
		{
			$match: cond
		},
		{
			$lookup: {
				from: "users",
				localField: "created_by",
				foreignField: "_id",
				as: "user_details"
			}
		},
		{
			$skip : skip
		},
		{
			$limit : limit
		}
	]);
	//let cities = await Cities.find(cond).skip(skip).limit(limit);
	res.status(200).json({
		status: 'success',
		message: 'Options',
		cities: cities,
		total: totalCount
	});
});

export const editCity = asyncHandler(async(req, res, next) => {
	const validationResultError = customValidationResult(req).array();
	if(validationResultError.length > 0) {
		console.log('Validation-Error===>'+JSON.stringify(validationResultError));
		res.status(200).json(validationResultError[0]);
	} else {
		let updatedCity = await Cities.findOneAndUpdate({_id : req.body.id}, {city_name: req.body.city_name});
		res.status(200).json({
			status: 'success',
			message: 'City updated successfully',
			data: updatedCity
		});
	}
});

export const deleteCity = asyncHandler(async(req, res, next) => {
	let id = req.body.id;
	await Cities.deleteOne({_id: id});
	res.status(200).json({
		status: 'success',
		message: 'City deleted'
	});
});

export const deleteBulkCities = asyncHandler(async(req, res, next) => {
	let filter = { _id: { $in: req.body.cityIds }  };
	await Cities.deleteMany(filter);
	res.status(200).json({
		status: 'success',
		message: 'Cities deleted',
		bulkDelete: 1
	});
});

export const enableDisableCities = asyncHandler(async(req, res, next) => {
	let filter = { _id: { $in: req.body.cityIds }  };
	let update = { status: req.body.status };
	await Cities.updateMany(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'Cities updated'
	});
});

export const enableDisableCity = asyncHandler(async(req, res, next) => {
	let filter = { _id: req.body.cityId };
	let update = { status: req.body.status };
	const result = await Cities.updateOne(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'Cities updated',
		data: result
	});
});

//End: City List


//Start: State List

export const getStates = asyncHandler(async(req, res, next) => {
	let cond = {};
	let keyword = req.body.keyword;
	let skip = req.body.skip;
	let limit = req.body.limit;
	if(keyword != "") {
		cond = {state_name: new RegExp(keyword, 'i')};
	}
	let totalCount = await States.count(cond);
	let states = await States.aggregate([
		{
			$match: cond
		},
		{
			$lookup: {
				from: "users",
				localField: "created_by",
				foreignField: "_id",
				as: "user_details"
			}
		},
		{
			$skip : skip
		},
		{
			$limit : limit
		}
	]);
	//let states = await States.find(cond).skip(skip).limit(limit);
	res.status(200).json({
		status: 'success',
		message: 'Options',
		states: states,
		total: totalCount
	});
});

export const editState = asyncHandler(async(req, res, next) => {
	const validationResultError = customValidationResult(req).array();
	if(validationResultError.length > 0) {
		console.log('Validation-Error===>'+JSON.stringify(validationResultError));
		res.status(200).json(validationResultError[0]);
	} else {
		let updatedState = await States.findOneAndUpdate({_id : req.body.id}, {state_name: req.body.state_name});
		res.status(200).json({
			status: 'success',
			message: 'State updated successfully',
			data: updatedState
		});
	}
});

export const deleteState = asyncHandler(async(req, res, next) => {
	let id = req.body.id;
	await States.deleteOne({_id: id});
	res.status(200).json({
		status: 'success',
		message: 'State deleted.'
	});
});

export const deleteBulkStates = asyncHandler(async(req, res, next) => {
	let filter = { _id: { $in: req.body.stateIds }  };
	await States.deleteMany(filter);
	res.status(200).json({
		status: 'success',
		message: 'States deleted',
		bulkDelete: 1
	});
});

export const enableDisableStates = asyncHandler(async(req, res, next) => {
	let filter = { _id: { $in: req.body.stateIds }  };
	let update = { status: req.body.status };
	await States.updateMany(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'States updated'
	});
});

export const enableDisableState = asyncHandler(async(req, res, next) => {
	let filter = { _id: req.body.stateId };
	let update = { status: req.body.status };
	const result = await States.updateOne(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'States updated',
		data: result
	});
});

//End: State List

//Start: Tenant List

export const getTenants = asyncHandler(async(req, res, next) => {
	let cond = {};
	let keyword = req.body.keyword;
	let skip = req.body.skip;
	let limit = req.body.limit;
	if(keyword != "") {
		cond = {tenant_type: new RegExp(keyword, 'i')};
	}
	let totalCount = await WhoCanContactUs.count(cond);
	let tenants = await WhoCanContactUs.aggregate([
		{
			$match: cond
		},
		{
			$lookup: {
				from: "users",
				localField: "created_by",
				foreignField: "_id",
				as: "user_details"
			}
		},
		{
			$skip : skip
		},
		{
			$limit : limit
		}
	]);
	//let tenants = await Tenants.find(cond).skip(skip).limit(limit);
	res.status(200).json({
		status: 'success',
		message: 'Options',
		tenants: tenants,
		total: totalCount
	});
});

export const editTenant = asyncHandler(async(req, res, next) => {
	const validationResultError = customValidationResult(req).array();
	if(validationResultError.length > 0) {
		console.log('Validation-Error===>'+JSON.stringify(validationResultError));
		res.status(200).json(validationResultError[0]);
	} else {
		let updatedTenant = await WhoCanContactUs.findOneAndUpdate({_id : req.body.id}, {tenant_type: req.body.tenant_type});
		res.status(200).json({
			status: 'success',
			message: 'Tenant type updated successfully',
			data: updatedTenant
		});
	}
});

export const deleteTenant = asyncHandler(async(req, res, next) => {
	let id = req.body.id;
	await WhoCanContactUs.deleteOne({_id: id});
	res.status(200).json({
		status: 'success',
		message: 'Tenant type deleted.'
	});
});

export const deleteBulkTenants = asyncHandler(async(req, res, next) => {
	let filter = { _id: { $in: req.body.tenantIds }  };
	await WhoCanContactUs.deleteMany(filter);
	res.status(200).json({
		status: 'success',
		message: 'Tenant type deleted.',
		bulkDelete: 1
	});
});

export const enableDisableTenants = asyncHandler(async(req, res, next) => {
	let filter = { _id: { $in: req.body.tenantIds }  };
	let update = { status: req.body.status };
	await WhoCanContactUs.updateMany(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'Tenant type updated.'
	});
});

export const enableDisableTenant = asyncHandler(async(req, res, next) => {
	let filter = { _id: req.body.tenantId };
	let update = { status: req.body.status };
	const result = await WhoCanContactUs.updateOne(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'Tenant type updated.',
		data: result
	});
});

//End: Tenant List

//Start: Users List

export const getUsers = asyncHandler(async(req, res, next) => {
	let cond = {};
	let keyword = req.body.keyword;
	let skip = req.body.skip;
	let limit = req.body.limit;
	if(keyword != "") {
		cond = {
			$or: [
				{
					first_name: new RegExp(keyword, 'i')
				},
				{
					last_name: new RegExp(keyword, 'i')
				},
				{
					email: new RegExp(keyword, 'i')
				}
			]
		};
	}
	let totalCount = await Users.count(cond);
	let users = await Users.aggregate([
		{
			$match: cond
		},
		{
			$skip : skip
		},
		{
			$limit : limit
		}
	]);
	//let tenants = await Tenants.find(cond).skip(skip).limit(limit);
	res.status(200).json({
		status: 'success',
		message: 'Options',
		tenants: users,
		total: totalCount
	});
});

export const editUser = asyncHandler(async(req, res, next) => {
	const validationResultError = customValidationResult(req).array();
	if(validationResultError.length > 0) {
		console.log('Validation-Error===>'+JSON.stringify(validationResultError));
		res.status(200).json(validationResultError[0]);
	} else {
		let updatedUser = await Users.findOneAndUpdate({_id : req.body.id}, {user: req.body.user});
		res.status(200).json({
			status: 'success',
			message: 'User updated successfully',
			data: updatedUser
		});
	}
});

export const deleteUsers = asyncHandler(async(req, res, next) => {
	let id = req.body.id;
	await Users.deleteOne({_id: id});
	res.status(200).json({
		status: 'success',
		message: 'User deleted.'
	});
});

export const deleteBulkUsers = asyncHandler(async(req, res, next) => {
	let filter = { _id: { $in: req.body.userIds }  };
	await Users.deleteMany(filter);
	res.status(200).json({
		status: 'success',
		message: 'User deleted.',
		bulkDelete: 1
	});
});

export const enableDisableUsers = asyncHandler(async(req, res, next) => {
	let filter = { _id: { $in: req.body.userIds }  };
	let update = { status: req.body.status };
	await Users.updateMany(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'User updated.'
	});
});

export const enableDisableUser = asyncHandler(async(req, res, next) => {
	let filter = { _id: req.body.userId };
	let update = { status: req.body.status };
	const result = await Users.updateOne(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'User updated.',
		data: result
	});
});

//End: Users List