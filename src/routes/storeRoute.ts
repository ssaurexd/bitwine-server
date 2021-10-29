import { Router } from 'express'
import { body } from 'express-validator'
import { isAuthenticated } from '../middlewares/auth'
import { validateBody } from '../middlewares/body'
import { 
	createStoreForUser,
	getStoreByUID,
	deleteItemById,
	updateItemById
} from '../controllers/storeController'


const storeRouter = Router()

storeRouter.get( '/:uid',
	isAuthenticated,
	getStoreByUID
)
/* --START-- 
-------------------------------------------------------- */
storeRouter.post( '/:uid/:type', 
	isAuthenticated,
	[
		body('product').not().isEmpty().withMessage('El producto es requerido'),
		validateBody
	],
	createStoreForUser
)
storeRouter.delete( '/:uid/:type', 
	isAuthenticated,
	[
		body('productId').not().isEmpty().withMessage('El id es requerido'),
		validateBody
	],
	deleteItemById
)
storeRouter.put( '/:uid/:type', 
	isAuthenticated,
	[
		body('productId').not().isEmpty().withMessage('El id es requerido'),
		body('count').not().isEmpty().withMessage('La cantidad es requerida'),
		validateBody
	],
	updateItemById
)
/* --END-- 
-------------------------------------------------------- */

export default storeRouter