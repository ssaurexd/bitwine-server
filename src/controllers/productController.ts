import { RequestHandler } from 'express'

import { IProduct } from '../models/Products/interfaces'
import Product from '../models/Products'


export const getFlashSales: RequestHandler = async ( req, res ) => {

	try {
		
		const flashSalesProducts = await Product.getProductsByCategory( 'flash-sales' )

		return res.status( 200 ).json({
			ok: true,
			products: flashSalesProducts
		})
	} catch ( error ) {

    	console.log("🚀 ~ file: productController.ts ~ line 18 ~ constgetFlashSales:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong.'
		})
	}
}

export const createProduct: RequestHandler = async ( req, res ) => {

	const data: IProduct = req.body

	try {

		const newProduct = await Product.create( data )

		return res.status( 201 ).json({
			ok: true,
			msg: 'Producto creado correctamente',
			product: newProduct
		})
		
	} catch ( error ) {
		
        console.log("🚀 ~ file: productController.ts ~ line 34 ~ constcreateProduct:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}

export const listProducts: RequestHandler = async ( req, res ) => {
	
	try {
		
		const products = await Product.find().populate({
			path: 'categories',
			select: 'name' 
		})

		return res.status( 200 ).json({
			ok: true,
			products
		})
	} catch ( error ) {

        console.log("🚀 ~ file: productController.ts ~ line 57 ~ constlistProducts:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}