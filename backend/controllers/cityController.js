import asyncHandler from 'express-async-handler';
import  Cities from '../models/CityModel.js';
import { logger } from '../config/configLoggers.js';
import { customValidationResult } from '../middleware/validationSchemas.js';
import { getUserId } from '../middleware/authMiddleware.js';

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