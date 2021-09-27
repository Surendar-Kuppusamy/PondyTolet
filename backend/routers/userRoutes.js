import express from "express";
import validator from 'express-validator';
import { signup, demo } from '../controllers/userController.js';
import { userValidationSchema } from '../middleware/validationSchemas.js';

const { checkSchema } = validator;

const router = express.Router()

router.route('/login').get()

router.route('/signup').post(checkSchema(userValidationSchema), signup)

//router.route('/test/:id/:user').get(testSchema, test)

export default router;