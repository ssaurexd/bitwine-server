import { Router } from 'express'
import { body } from 'express-validator'

import { isAuthenticated } from '../middlewares/auth'
import { validateBody } from '../middlewares/body'
import * as storeController from '../controllers/storeController'


const storeRouter = Router()

/* --START-- 
-------------------------------------------------------- */
storeRouter.route( '/:uid' )
	.get(
		isAuthenticated,
		storeController.getStoreByUID
	)
/* --END-- 
-------------------------------------------------------- */

/* --START-- 
-------------------------------------------------------- */
storeRouter.route( '/:uid/:type')
	.post(
		isAuthenticated,
		[
			body('product').not().isEmpty().withMessage('El producto es requerido'),
			validateBody
		],
		storeController.createStoreForUser
	)
	.delete(
		isAuthenticated,
		[
			body('productId').not().isEmpty().withMessage('El id es requerido'),
			validateBody
		],
		storeController.deleteItemById
	)
	.put(
		isAuthenticated,
		[
			body('productId').not().isEmpty().withMessage('El id es requerido'),
			body('count').not().isEmpty().withMessage('La cantidad es requerida'),
			validateBody
		],
		storeController.updateItemById
	)

/* --END-- 
-------------------------------------------------------- */

storeRouter.post( '/reset-store/:uid/:type', 
	isAuthenticated,
	storeController.resetStoreByUid
)

export default storeRouter