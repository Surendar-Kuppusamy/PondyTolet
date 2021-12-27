import express from "express";
import validator from 'express-validator';
import { signup, login } from '../controllers/userController.js';
import { userValidationSchema, createCityValidationSchema } from '../middleware/validationSchemas.js';
import { verifyToken } from '../middleware/authMiddleware.js'

const { checkSchema } = validator;

const router = express.Router()

router.route('/login').post(checkSchema(createCityValidationSchema), login)

router.route('/signup').post(checkSchema(userValidationSchema), signup)

//router.route('/test/:id/:user').get(testSchema, test)

export default router;