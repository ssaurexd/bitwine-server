import { RequestHandler } from 'express'
import { Types } from 'mongoose'

import { ISalesBase, IShipment } from '../models/Sales/interfaces'
import { IProduct, IProductFromFrontEnd } from '../models/Products/interfaces'
import { IUserAddress } from '../models/Users/interfaces'
import { getTotal } from '../helpers/helpers'

import Sales from '../models/Sales'
import Users from '../models/Users'
import Product from '../models/Products'


interface IAddNewSaleForUser {
	products: IProductFromFrontEnd[],
	shipment: IShipment,
	uid?: string,
	email: string,
	address: IUserAddress
}
export const addNewSaleForUser: RequestHandler<any, any, IAddNewSaleForUser> = async ( req, res ) => {

	const {
		products,
		shipment, 
		uid = '',
		email,
		address
	} = req.body
	
	try {

		const { total, totalItems } = getTotal( products, shipment )
		const user = uid ? await Users.findById( uid ) : null
		let canContinue = true
		const newSale: ISalesBase = {
			email,
			products: products.map( item => item._id ),
			shipment,
			uid: new Types.ObjectId( user?._id ),
			total,
			totalItems,
			address
		}
		const productsFromDB = await Product.find({ _id: { $in: products.map( prod => prod._id ) } })
		const productsWithNoStock: IProduct[] = []

		/* checamos stock */
		productsFromDB.forEach( prod1 => {
			products.map( prod2  => {

				if( prod1._id.toString() === prod2._id && prod1.onStock < prod2.count ) {
					productsWithNoStock.push( prod1 )
					return canContinue = false
				}
			})
		})
		
		if( !canContinue ) {

			return res.status( 401 ).json({
				ok: false,
				msg: 'Alguno de los producto no cuenta con suficiente stock',
				products: productsWithNoStock
			})
		}

		/* Descontamos stock */
		productsFromDB.forEach( prod1 => {
			products.map( async ( prod2 ) => {
				if( prod1._id.toString() === prod2._id ) {
					await Product.findByIdAndUpdate( prod1._id, {
						$set: {
							onStock: prod1.onStock - prod2.count
						}
					})
				}
			})
		})

		const sale = await Sales.create( newSale )
		
		return res.status( 201 ).json({
			ok: true,
			msg: 'Compra hecha correctamente.',
			sale
		})
	} catch ( error ) {

        console.log("🚀 ~ file: salesController.ts ~ line 26 ~ constaddNewSaleForUser:RequestHandler<any,any,IAddNewSaleForUser>= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal!'
		})
	}
}

export const getAllSalesPending: RequestHandler = async ( req, res ) => {
	
	try {
		 
		const pendingSales = await Sales.find({ status: 'pending' })

		return res.status( 200 ).json({
			ok: true,
			sales: pendingSales
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: salesController.ts ~ line 103 ~ constgetAllSalesPending:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal!'
		})
	}
}