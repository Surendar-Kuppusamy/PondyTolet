import express from "express";
import validator from 'express-validator';
import { createAsset } from '../controllers/assetController.js';
import { assetValidationSchema } from '../middleware/validationSchemas.js';

const { checkSchema } = validator;
const router = express.Router()

router.route('/asset/add').post(checkSchema(assetValidationSchema), createAsset)

export default router;