import { Schema } from 'mongoose'
import User from '../../models/Users'
import { IStore, IStoreModel, IStoreProduct } from './interfaces'

export const storeProductSchema = new Schema<IStoreProduct>({
	count: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	priceWithDiscount: {
		type: Number,
		required: true
	},
	discount: {
		type: Number,
		default: 0
	},
	image: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
		unique: true
	}
})

export const storeSchema = new Schema<IStore, IStoreModel>({
	uid: {
		type: Schema.Types.ObjectId,
		ref: User,
		required: true
	},
	type: {
		type: String,
		enum: ['shopCart', 'wishList'],
		required: true
	},
	products: {
		type: [ storeProductSchema ],
		default: []
	}
}, {
	timestamps: true
})
