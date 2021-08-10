import { Router } from 'express'
import { body } from 'express-validator'

import { isAuthenticatedAndAdmin } from '../middlewares/auth'
import { validateBody } from '../middlewares/body'
import { 
	createCategory, listCategories 
} from '../controllers/categoryController'


const categoryRouter = Router()

categoryRouter.post( '/',
	isAuthenticatedAndAdmin,
	[
		body('name').not().isEmpty().withMessage('El nombre es requerido'),
		validateBody
	],
	createCategory
)
categoryRouter.get( '/',
	listCategories
)

export default categoryRouter