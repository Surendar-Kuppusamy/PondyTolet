import express from "express";
import validator from 'express-validator';
import { usersList, bulkDataInsert, getOptions, createSingleOption } from '../controllers/settingController.js';
import { getCities, editCity, deleteCity, deleteBulkCities, enableDisableCities, enableDisableCity } from '../controllers/cityController.js'
import { getStates, editState, deleteState, deleteBulkStates, enableDisableStates, enableDisableState } from '../controllers/stateController.js';
import { getTenants, editTenant, deleteTenant, deleteBulkTenants, enableDisableTenants, enableDisableTenant  } from '../controllers/tenantController.js';
import { getUsers, enableDisableUsers, enableDisableUser } from '../controllers/usersListController.js';
import { userValidationSchema, createCityValidationSchema, createSingleOptionValidationSchema, bulkDataValidationSchema, editCityValidationSchema, editStateValidationSchema, editTenantValidationSchema  } from '../middleware/validationSchemas.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const { checkSchema } = validator;

const router = express.Router()

//router.route('/login').get()

//router.route('/create/cities').post(checkSchema(createCityValidationSchema), )

//router.route('/test/:id/:user').get(testSchema, test)

router.route('/bulk/add').post(verifyToken, checkSchema(bulkDataValidationSchema), bulkDataInsert)  //Add city, states, tenants

router.route('/create/single/option').post(verifyToken, checkSchema(createSingleOptionValidationSchema), createSingleOption)    //Create city, state, tenants

router.route('/users/list').get(usersList)  //User list

router.route('/get/options').get(getOptions)    //Get options['city', 'state', 'tenant']


//Start: City List

router.route('/get/cities').post(getCities)

router.route('/edit/city').post(checkSchema(editCityValidationSchema), editCity)

router.route('/delete/city').post(deleteCity)

router.route('/delete/bulk/city').post(deleteBulkCities)

router.route('/bulk/status/change/city').post(enableDisableCities)

router.route('/change/city/status').post(enableDisableCity)

//End: City List



//Start: State List

router.route('/get/states').post(getStates)

router.route('/edit/state').post(checkSchema(editStateValidationSchema), editState)

router.route('/delete/state').post(deleteState)

router.route('/delete/bulk/state').post(deleteBulkStates)

router.route('/bulk/status/change/state').post(enableDisableStates)

router.route('/change/state/status').post(enableDisableState)

//End: State List


//Start: Tenant List

router.route('/get/tenants').post(getTenants)

router.route('/edit/tenant').post(checkSchema(editTenantValidationSchema), editTenant)

router.route('/delete/tenant').post(deleteTenant)

router.route('/delete/bulk/tenant').post(deleteBulkTenants)

router.route('/bulk/status/change/tenant').post(enableDisableTenants)

router.route('/change/tenant/status').post(enableDisableTenant)

//End: Tenant List

//Start: User

router.route('/get/users').post(getUsers)

router.route('/bulk/status/change/user').post(enableDisableUsers)

router.route('/change/user/status').post(enableDisableUser)

//End: User

export default router;