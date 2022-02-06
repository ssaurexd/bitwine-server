import { RequestHandler } from 'express'

import { ISalesBase, IShipment } from '../models/Sales/interfaces'
import { IProductFromFrontEnd } from '../models/Products/interfaces'
import { IUserAddress } from '../models/Users/interfaces'
import { getTotal } from '../helpers/helpers'
import Sales from '../models/Sales'
import Users from '../models/Users'
import { Types } from 'mongoose'


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
		const newSale: ISalesBase = {
			email,
			products: products.map( item => item._id ),
			shipment,
			uid: new Types.ObjectId( user?._id ),
			total,
			totalItems,
			address
		}
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