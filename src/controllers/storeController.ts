import { RequestHandler } from 'express'
import { Types } from 'mongoose'
import Store from '../models/Store'
import { IStore, IStoreProduct, IStoreType } from '../models/Store/interfaces'
import { getUserID } from '../helpers/jwt'
import { compareIds } from '../helpers/helpers'


export const getStoreByUID: RequestHandler = async ( req, res ) => {
	
	const { uid } = req.params
	const token = req.headers['x-token'] as string
	
	try {
		
		const uidLogged = getUserID( token )
		
		if( !compareIds( uid, uidLogged ) ) {

			return res.status( 401 ).json({
				ok: false,
				msg: 'Oops! Something went wrong.'
			})
		}
 
		const shopCart = await Store.findOne({ uid, type: 'shopCart' })
		const wishList = await Store.findOne({ uid, type: 'wishList' })

		return res.status( 200 ).json({
			ok: true,
			shopCart,
			wishList
		})
		
	} catch ( error ) {
		
        console.log("🚀 ~ file: storeController.ts ~ line 31 ~ constgetStoreByUID:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong.'
		})
	}
}

export const createStoreForUser: RequestHandler = async ( req, res ) => {

	const { uid, type } = req.params
	const typeT = ( type as IStoreType )
	const product: IStoreProduct = req.body.product

	try {
		
		const store = await Store.findOne({ uid, type: typeT })

		if( store ) {
			
			await store.updateOne({
				$addToSet: { products: product }
			})
		} else {

			const data: IStore = {
				uid: new Types.ObjectId( uid ),
				type: typeT,
				products: [ product ]
			}
			const newStore = new Store( data )

			await newStore.save()
		}

		return res.status( 201 ).json({
			ok: true,
			msg: 'Producto agregado correctamente.'
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: storeController.ts ~ line 80 ~ constcreateStoreForUser:RequestHandler<ICreateStoreForUserParams>= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong.'
		})
	}
}

export const deleteItemById: RequestHandler = async ( req, res ) => {
	
	const { uid, type } = req.params
	const { productId } = req.body
	const token = req.headers['x-token'] as string
	const typeT = ( type as IStoreType )

	try {

		const uidLogged = getUserID( token )

		if( !compareIds( uid, uidLogged ) ) {

			return res.status( 401 ).json({
				ok: false,
				msg: 'Oops! Something went wrong.'
			})
		}

		await Store.findOneAndUpdate({ uid, type: typeT }, {
			$pull: {
				products: {
					_id: productId
				}
			}
		})

		return res.status( 201 ).json({
			ok: true,
			msg: 'Producto eliminado correctamente.'
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: storeController.ts ~ line 106 ~ constdeleteItemById:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong.'
		})
	}
}

export const updateItemById: RequestHandler = async ( req, res ) => {
	
	const { uid, type } = req.params
	const { productId, count } = req.body
	const token = req.headers['x-token'] as string
	const typeT = ( type as IStoreType )

	try {

		const uidLogged = getUserID( token )

		if( !compareIds( uid, uidLogged ) ) {

			return res.status( 401 ).json({
				ok: false,
				msg: 'Oops! Something went wrong.'
			})
		}
		
		await Store.findOneAndUpdate(
			{ 
				uid, 
				type: typeT, 
				'products._id': productId 
			}, 
			{
				$set: {
					'products.$[element].count': count 
				}
			},
			{
				arrayFilters: [{ 'element._id': productId }]
			}
		)

		return res.status( 201 ).json({
			ok: true,
			msg: 'Producto actualizado correctamente.'
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: storeController.ts ~ line 106 ~ constdeleteItemById:RequestHandler= ~ error", error)
		return res.status( 500 ).json({
			ok: false,
			msg: 'Oops! Something went wrong.'
		})
	}
}

export const resetStoreByUid: RequestHandler = async ( req, res ) => {
	
	const { type, uid } = req.params
	const typeT = ( type as IStoreType )
	
	try {
		
		await Store.findOneAndUpdate({ uid, type: typeT }, {
			$set: {
				products: []
			}
		})

		return res.status( 200 ).json({
			ok: true,
			msg: 'Store Actualizado'
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: storeController.ts ~ line 188 ~ constresetStoreByUid:RequestHandler<IParamsResetStoreByUid>= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}
}