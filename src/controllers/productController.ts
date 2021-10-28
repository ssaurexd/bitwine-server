import { RequestHandler, RequestParamHandler, Response } from 'express'

import { IProduct } from '../models/Products/interfaces'
import { toSlug } from '../helpers/converToSlug'
import Product from '../models/Products'


interface IListQuery {
	limitQuery: string,
	pageQuery: string
}

export const getFlashSales: RequestHandler = async ( req, res ) => {

	try {
		
		const { products } = await Product.getProductsByCategory( {}, 'flash-sales' )

		return res.status( 200 ).json({
			ok: true,
			products
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

	let data: IProduct = req.body

	try {

		const newProduct = new Product( data )
		
		newProduct.slug = toSlug( newProduct.name )
		await newProduct.save()

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

export const uploadProductImages: RequestHandler = async ( req, res, next  ) => {
	
	if( !req.files ) {
		
		return res.status( 400 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal o faltan las imagenes'
		})
	} else {

		req.body = req.files
		const { images, image } = req.body
		const imagesPath = images.map(( item: any ) => item.path.replace('public/', '') )
		const imagePath = image[0].path.replace('public/', '')

		return res.status( 201 ).json({
			ok: true,
			imagePath,
			imagesPath
		})
	}
}

export const listAllProducts: RequestHandler = async ( req, res ) => {
	
	try {
		
		const products = await Product.find({}).populate({ path: 'categories', select: 'name value' })

		return res.status( 200 ).json({
			ok: true,
			products,
		})
	} catch ( error ) {

		console.log("🚀 ~ file: productController.ts ~ line 96 ~ constlistAllProducts:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}

export const listProducts: RequestHandler<{}, {}, {}, IListQuery> = async ( req, res ) => {

	const { limitQuery = '12', pageQuery = '0' } = req.query
	const limit = parseInt( limitQuery )
	const page = parseInt( pageQuery )
	const skip = page * limit
	const query = {}
	

	try {
		
		const products = await Product
			.find( query )
			.limit( limit )
			.skip( skip )
			.populate({
				path: 'categories',
				select: 'name value' 
			})
			.sort({
				createdAt: -1
			})
		const total = await Product.find( query ).estimatedDocumentCount()
		const canNext: boolean = products.length < limit || products.length === 0 ? false : true
		const canPrevious: boolean = page <= 1 ? false : true
		const nextPage: number =  page + 1
		const previousPage: number =  page > 0 ? page - 1 : page 

		return res.status( 200 ).json({
			ok: true,
			page,
			next: canNext,
			nextPage,
			previous: canPrevious,
			previousPage,
			total,
			products,
		})
	} catch ( error ) {

        console.log("🚀 ~ file: productController.ts ~ line 57 ~ constlistProducts:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}

interface IReqBodyListProductsForMarket {
	categories: string[],
	query: string,
	rate: number,
	rangePrice: number[],
	limitQuery: number,
	pageQuery: number
}
export const listProductsForMarket: RequestHandler<any, any, IReqBodyListProductsForMarket> = async ( req, res ) => {

	const { 
		limitQuery = 12, 
		pageQuery = 0,
		categories = [],
		query = '',
		rate = 0,
		rangePrice = [ 0, 999999 ]
	} = req.body
	const limit = limitQuery
	const page = pageQuery
	const skip = page * limit
	const aggregate = [
		{
			$match: {
					name: { $regex: query, $options: 'i' },
					price: { $gte: rangePrice[0], $lt: rangePrice[1] }
					
					/* rate: { $gte: rated }
						categories: { $in: [ ...categories ] }
					*/
			} 
		},
		{ 
			$lookup : {
				from: 'categories',
				localField: 'categories',
				foreignField: '_id',
				as: 'categoriesPop'
			}

		},
		{
			$project: {
				name: 1,
				description: 1,
				price: 1,
				priceWithDiscount: 1,
				discount: 1,
				categories: '$categoriesPop',
				images: 1,
				image: 1,
				rate: {
					$divide: [
						{
							$reduce: {
								input: '$rate',
								initialValue: 0,
								in: {
									$sum: [ '$$value', '$$this.value' ]
								}
							}
						},
						{
							$cond: {
								if: { $ne: [ { $size: '$rate' }, 0 ] },
								then: { $size: '$rate' },
								else: 1
							}
						}
					]
				},
				onStock: 1,
				slug: 1,
			}
		},
		{
			$match: {
				rate: { $gte: rate }
			}
		},
		{
			$project: {
				categories: {
					createdAt: 0,
					updatedAt: 0,
					__v: 0
				}
			}
		},
		{ $sort: { createAt: -1 } },
		{ $skip: skip },
		{ $limit: limit }
	]
	const aggregateTotal = [
		{
			$match: {
					name: { $regex: query, $options: 'i' },
					price: { $gte: rangePrice[0], $lt: rangePrice[1] }
			} 
		},
		{ 
			$lookup : {
				from: 'categories',
				localField: 'categories',
				foreignField: '_id',
				as: 'categoriesPop'
			}

		},
		{
			$project: {
				name: 1,
				description: 1,
				price: 1,
				priceWithDiscount: 1,
				discount: 1,
				categories: '$categoriesPop',
				images: 1,
				image: 1,
				rate: {
					$divide: [
						{
							$reduce: {
								input: '$rate',
								initialValue: 0,
								in: {
									$sum: [ '$$value', '$$this.value' ]
								}
							}
						},
						{
							$cond: {
								if: { $ne: [ { $size: '$rate' }, 0 ] },
								then: { $size: '$rate' },
								else: 1
							}
						}
					]
				},
				onStock: 1,
				slug: 1,
			}
		},
		{
			$match: {
				rate: { $gte: rate }
			}
		},
		{ $count: 'total' }
	]
	
	try {
		
		const products = await Product.aggregate( aggregate )
		const total = await Product.aggregate( aggregateTotal )
		const canNext: boolean = products.length < limit || products.length === 0 ? false : true
		const canPrevious: boolean = page <= 1 ? false : true
		const nextPage: number = canNext ? page + 1 : null
		const previousPage: number =  page > 0 ? page - 1 : page 

		return res.status( 200 ).json({
			ok: true,
			page,
			next: canNext,
			nextPage,
			previous: canPrevious,
			previousPage,
			total: total[0]?.total ?? 0,
			products,
		})
	} catch ( error ) {
		
    	console.log("🚀 ~ file: productController.ts ~ line 265 ~ constlistProductsForMarket:RequestHandler<any,any,IReqBodyListProductsForMarket>= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}

export const listProductsByCategory: RequestHandler<{ category: string }, {}, {}, IListQuery> = async ( req, res ) => {
	
	const { limitQuery, pageQuery } = req.query
	const { category } = req.params
	const limit = parseInt( limitQuery )
	const page = parseInt( pageQuery )	

	try {

		const query = {
			
		}
		const { products, total } = await Product.getProductsByCategory( query, category, limit, page )
		const canNext: boolean = products.length < limit || products.length === 0 ? false : true
		const canPrevious: boolean = page <= 1 ? false : true
		const nextPage: number =  page + 1
		const previousPage: number =  page > 0 ? page - 1 : page 

		return res.status( 200 ).json({
			ok: true,
			page,
			next: canNext,
			nextPage,
			previous: canPrevious,
			previousPage,
			total,
			products,
		})
	} catch ( error ) {

        console.log("🚀 ~ file: productController.ts ~ line 57 ~ constlistProducts:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}

export const getProductBySlug: RequestHandler = async ( req, res ) => {

	const { slug } = req.params

	try {
		
		const product = await Product.findOne({ slug }).populate({ path: 'categories',	select: 'name value' })
		
		if( product ) {

			const aggregate = [
				{ 
					$match: {
						$and: [
							{
								_id: { $ne: product._id }
							},
							{
								categories: { $in: [ product.categories ] }
							}
						]
					}
				},
				{ 
					$lookup : {
						from: 'categories',
						localField: 'categories',
						foreignField: '_id',
						as: 'categoriesPop'
					}

				},
				{
					$project: {
						name: 1,
						description: 1,
						price: 1,
						priceWithDiscount: 1,
						discount: 1,
						categories: '$categoriesPop',
						images: 1,
						image: 1,
						rate: 1,
						onStock: 1,
						slug: 1,
					}
				},
				{
					$project: {
						categories: {
							createdAt: 0,
							updatedAt: 0,
							__v: 0
						}
					}
				},
				{ $sort: { createAt: -1 } },
				{ $limit: 4 }
			]
			const related = await Product.aggregate( aggregate )

			return res.status( 200 ).json({
				ok: true,
				product,
				related
			})
		} else {

			return res.status( 400 ).json({
				ok: false,
				msg: 'No existe el producto'
			})
		}
	} catch ( error ) {
		
        console.log("🚀 ~ file: productController.ts ~ line 174 ~ constgetProductBySlug:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
	
}

export const getProductStockById: RequestHandler = async ( req, res ) => {

	const { productId } = req.body
	
	try {
		
		const product = await Product.findById( productId )

		return res.status( 200 ).json({
			ok: true,
			onStock: product.onStock
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: productController.ts ~ line 279 ~ constgetProductStockById:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}

interface IGetProductsByQueryBody {
	query: string
}
export const getProductsByQuery: RequestHandler<RequestParamHandler, any, IGetProductsByQueryBody> = async ( req, res ) => {

	const { query } = req.body

	try {
		
		const products = await Product.aggregate([
			{
				$match: {  
					name: { $regex: query, $options: 'i' }
				} 
			},
			{ 
				$lookup : {
					from: 'categories',
					localField: 'categories',
					foreignField: '_id',
					as: 'categoriesPop'
				}

			},
			{
				$project: {
					name: 1,
					description: 1,
					price: 1,
					priceWithDiscount: 1,
					discount: 1,
					categories: '$categoriesPop',
					images: 1,
					image: 1,
					rate: 1,
					onStock: 1,
					slug: 1,
				}
			},
			{
				$project: {
					categories: {
						createdAt: 0,
						updatedAt: 0,
						__v: 0
					}
				}
			},
			{ $sort: { createAt: -1 } },
			{ $limit: 6 }
		])

		return res.status( 200 ).json({
			ok: true,
			products
		})
	} catch ( error ) {

        console.log("🚀 ~ file: productController.ts ~ line 305 ~ constgetProductsByQuery:RequestHandler<void,void,IGetProductsByQueryBody>= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong'
		})
	}
}