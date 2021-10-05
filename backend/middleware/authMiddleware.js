import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import Users from '../models/UserModel.js';
import { logger } from '../config/configLoggers.js'


const verifyToken = asyncHandler(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = await Users.findById(decoded.user_id).select('-password');
            next();
        } catch (error) {
            logger.error(error);
            //console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed');
        }
    }
    
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

export { verifyToken }