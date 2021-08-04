import { Router } from 'express'
import { body } from 'express-validator'

import { validateBody } from '../middlewares/body'
import { isAuthenticatedAndAdmin } from '../middlewares/auth'
import { 
	getFlashSales,
	createProduct, 
	listProducts
} from '../controllers/productController'


const productRouter = Router()

productRouter.post( '/',
	isAuthenticatedAndAdmin,
	[
		body('name').not().isEmpty().withMessage('El nombre es requerido'),
		body('description').not().isEmpty().withMessage('La descripción es requerida'),
		body('price').not().isEmpty().withMessage('El precio es requerido'),
		body('priceWithDiscount').not().isEmpty().withMessage('El precio con descuento es requerido'),
		body('categories').not().isEmpty().withMessage('Las categorias son requeridas'),
		body('image').not().isEmpty().withMessage('La url de la imagen es requerida'),
		validateBody
	],
	createProduct
)
productRouter.get( '/',
	listProducts
)
productRouter.get( '/flash-sales', 
	getFlashSales
)

export default productRouter