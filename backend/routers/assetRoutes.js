import express from "express";
import validator from 'express-validator';
import { createAsset } from '../controllers/assetController.js';
import { assetValidationSchema } from '../middleware/validationSchemas.js';
import { verifyToken } from '../middleware/authMiddleware.js'

const { checkSchema } = validator;
const router = express.Router()

router.route('/asset/add').post(verifyToken, checkSchema(assetValidationSchema), createAsset)

export default router;