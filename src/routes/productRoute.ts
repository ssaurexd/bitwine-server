import { Router } from 'express'
import { body,  } from 'express-validator'

import { validateBody } from '../middlewares/body'
import { isAuthenticatedAndAdmin } from '../middlewares/auth'
import * as productController from '../controllers/productController'
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
		productController.createProduct
	)
	.get(
		productController.listProducts
	)
productRouter.get( '/by-category/:category',
	productController.listProductsByCategory
)
productRouter.get( '/list-all',
	productController.listAllProducts
)
productRouter.get( '/by-slug/:slug',
	productController.getProductBySlug
)
productRouter.post( '/upload-product-images', 
	isAuthenticatedAndAdmin,
	productImageMulter.fields([
		{ name: 'image', maxCount: 1 },
		{ name: 'images', maxCount: 9 }
	]),
	productController.uploadProductImages
)
productRouter.get( '/flash-sales', 
	productController.getFlashSales
)
productRouter.post( '/product-stock', 
	[
		body('productId').not().isEmpty().withMessage('El id del producto es requerido'),
		validateBody
	],
	productController.getProductStockById
)
productRouter.post( '/search-by-query', 
	[
		body('query').not().isEmpty().withMessage('El query es requerido'),
		validateBody
	],
	productController.getProductsByQuery
)

productRouter.post( '/list-products-for-market', 
	productController.listProductsForMarket
)

/* Es para el getStaticPaths de Next */
productRouter.get( '/get-product-slugs', productController.getAllProductSlugs )

export default productRouter