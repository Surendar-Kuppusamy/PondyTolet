import express from "express";
import validator from 'express-validator';
import { createCities } from '../controllers/settingController.js';
import { createCityValidationSchema } from '../middleware/validationSchemas.js';

const { checkSchema } = validator;

const router = express.Router()

//router.route('/login').get()

router.route('/create/cities').post(checkSchema(createCityValidationSchema), )

//router.route('/test/:id/:user').get(testSchema, test)

export default router;