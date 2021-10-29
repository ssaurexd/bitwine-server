import { Router } from 'express'
import { body } from 'express-validator'

import {
	createBanner,
	getBanners,
	getBannersForHome
} from '../controllers/bannerController'
import { validateBody } from '../middlewares/body'
import { isAuthenticatedAndAdmin } from '../middlewares/auth'


const bannerRouter = Router()

bannerRouter.route( '/' )
	.get(
		getBanners
	)
	.post(
		isAuthenticatedAndAdmin,
		[
			body('title').not().isEmpty().withMessage('El titulo es requerido'),
			body('description').not().isEmpty().withMessage('La descripción es requeridad'),
			body('productSlug').not().isEmpty().withMessage('El slud del producto es requerido'),
			body('productImg').not().isEmpty().withMessage('La imagen del producto es requerida'),
			body('isActive').not().isEmpty().withMessage('isActive es requerido'),
			validateBody
		],
		createBanner
	)

bannerRouter.get( '/get-banners-for-home', 
	getBannersForHome
)

export default bannerRouter