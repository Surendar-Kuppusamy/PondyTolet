import express from "express";
import { signup, test } from '../controllers/userController.js';
import { testSchema } from '../middleware/validationSchemas.js';

const router = express.Router()

router.route('/login').get()

router.route('/signup').post(signup)

router.route('/test/:id/:user').get(testSchema, test)

export default router;