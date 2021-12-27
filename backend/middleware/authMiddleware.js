import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler'
import Users from '../models/UserModel.js';
import { logger } from '../config/configLoggers.js'


export const verifyToken = asyncHandler(async(req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Users.findById(decoded.user_id).select('-password');
            next();
        } catch (error) {
            logger.error(error);
            //console.error(error)
            res.status(401)
            throw new Error('Token expired.');
            /* if(error instanceof jwt.TokenExpiredError) {
                res.status(401).json({status: 'error', message: 'TokenExpiredError'});
            } else {
                res.status(401)
                throw new Error('Token expired.');
            } */
        }
    }
    
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})

export const generateToken = (user_id) => {
    return jwt.sign({ user_id:  user_id}, process.env.JWT_SECRET, { expiresIn: '8h' });
};

export const getUserId = async(req) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            return decoded.user_id;
        } catch (error) {
            return false;
        }
    }
    if (!token) {
        return false;
    }
}