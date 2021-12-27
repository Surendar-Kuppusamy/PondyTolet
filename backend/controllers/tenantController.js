import asyncHandler from 'express-async-handler';
import { logger } from '../config/configLoggers.js';
import { customValidationResult } from '../middleware/validationSchemas.js';
import { getUserId } from '../middleware/authMiddleware.js';
import WhoCanContactUs from '../models/WhoCanContactUsModel.js';


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