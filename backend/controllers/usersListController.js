import asyncHandler from 'express-async-handler';
import Users from '../models/UserModel.js';
import { logger } from '../config/configLoggers.js';
import { customValidationResult } from '../middleware/validationSchemas.js';
import { getUserId } from '../middleware/authMiddleware.js';

export const getUsers = asyncHandler(async(req, res, next) => {
	let cond = {};
	let condKey = {};
	let condStatus = {};
    let postData = req.body;
	if(postData.keyword != "") {
		condition["$and"].push({
			$or: [
					{
						first_name: new RegExp(postData.keyword, 'i')
					},
					{
						last_name: new RegExp(postData.keyword, 'i')
					},
					{
						email: new RegExp(postData.keyword, 'i')
					}
            ]
		});
		condKey = {
			$or: [
					{
						first_name: new RegExp(postData.keyword, 'i')
					},
					{
						last_name: new RegExp(postData.keyword, 'i')
					},
					{
						email: new RegExp(postData.keyword, 'i')
					}
            ]
		};
	}
	if(postData.filterUserStatus != 0) {
		condStatus = {
			user_status: postData.filterUserStatus
		};
	}
	let countKey = Object.keys(condKey);
	let countStatus = Object.keys(condStatus);

	if(countKey.length > 0 && countStatus.length > 0 ) {
		cond = {
			$and: [
				condKey,
				condStatus
			]
		}
	} else if(countKey.length > 0) {
		cond = condKey;
	} else if(countStatus.length > 0) {
		cond = condStatus;
	}

	let totalCount = await Users.count(cond);
	let users = await Users.aggregate([
		{
			$match: cond
		},
        {
            $project: { email: 1, user_status: 1, name: { $concat: [ "$first_name", " - ", "$last_name" ] }, dob: { $dateToString: { format: "%d-%m-%Y", date: "$dob" } }, user_type: { $switch: { branches: [ { case: { $eq: ["$user_type", 1] }, then: "Admin" }, { case: { $eq: ["$user_type", 2] }, then: "House Owner" }, { case: { $eq: ["$user_type", 3] }, then: "Tenant" } ], default: "Invalid Role." } } }
        },
		{
			$skip : postData.skip
		},
		{
			$limit : postData.limit
		}
	]);
	//let cities = await Cities.find(cond).skip(skip).limit(limit);
	res.status(200).json({
		status: 'success',
		message: 'Users list.',
		users: users,
		total: totalCount
	});
});


export const enableDisableUsers = asyncHandler(async(req, res, next) => {
	let filter = { _id: { $in: req.body.userIds }  };
	let update = { user_status: req.body.status };
	await Users.updateMany(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'User updated'
	});
});

export const enableDisableUser = asyncHandler(async(req, res, next) => {
	let filter = { _id: req.body.userId };
	let update = { user_status: req.body.status };
	const result = await Users.updateOne(filter, update);
	res.status(200).json({
		status: 'success',
		message: 'User updated',
		data: result
	});
});