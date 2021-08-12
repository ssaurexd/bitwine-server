import { Router } from 'express'
import { body,  } from 'express-validator'

import { validateBody } from '../middlewares/body'
import { isAuthenticatedAndAdmin } from '../middlewares/auth'
import { 
	getFlashSales,
	createProduct, 
	listProducts,
	uploadProductImages,
	listProductsByCategory
} from '../controllers/productController'
import { productImageMulter } from '../config/multer'


const productRouter = Router()

productRouter.route( '/' )
	.post(
		isAuthenticatedAndAdmin,
		[
			body('name').not().isEmpty().withMessage('El nombre es requerido'),
			body('description').not().isEmpty().withMessage('La descripción es requerida'),
			body('price').not().isEmpty().withMessage('El precio es requerido'),
			body('priceWithDiscount').not().isEmpty().withMessage('El precio con descuento es requerido'),
			body('categories').not().isEmpty().withMessage('Las categorias son requeridas'),
			body('onStock').not().isEmpty().withMessage('onStock es requerido'),
			body('image').not().isEmpty().withMessage('La imagen es requerida'),
			body('images').not().isEmpty().withMessage('Las imagenes son requeridas'),
			validateBody
		],
		createProduct
	)
	.get(
		listProducts
	)
productRouter.get( '/by-category/:category',
	listProductsByCategory
)
productRouter.post( '/upload-product-images', 
	isAuthenticatedAndAdmin,
	productImageMulter.fields([
		{ name: 'image', maxCount: 1 },
		{ name: 'images', maxCount: 9 }
	]),
	uploadProductImages
)
productRouter.get( '/flash-sales', 
	getFlashSales
)

export default productRouter