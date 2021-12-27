import asyncHandler from 'express-async-handler'
import { logger } from '../config/configLoggers.js';
import { customValidationResult } from '../middleware/validationSchemas.js';
import { getUserId } from '../middleware/authMiddleware.js';
import States from '../models/StateModel.js';

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