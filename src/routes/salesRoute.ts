import { Router } from 'express'
import { body } from 'express-validator'

import { isAuthenticated } from '../middlewares/auth'
import { validateBody } from '../middlewares/body'
import * as salesController from '../controllers/salesController'


const salesRouter = Router()

salesRouter.post( '/add-new-sale',
	[
		body('shipment').not().isEmpty().withMessage('El campo shipment es requerido'),
		body('email').not().isEmpty().withMessage('El campo email es requerido'),
		body('products').not().isEmpty().withMessage('El campo products es requerido'),
		body('address').not().isEmpty().withMessage('El campo address es requerido'),
		validateBody
	],
	salesController.addNewSaleForUser
)

export default salesRouter