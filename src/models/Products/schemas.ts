import { Schema } from 'mongoose'

import { IProduct, IProductModel } from './interfaces'
import { getProductsByCategory } from './methods'
import Category from '../Categories'


export const rateSchema = new Schema({
	uid: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true
	},
	value: {
		type: Number,
		required: true
	}
})
export const productSchema = new Schema<IProduct, IProductModel>({
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
	categories: {
		type: [ Schema.Types.ObjectId ],
		required: true,
		ref: Category
	},
	images: {
		type: [ String ]
	},
	image: {
		type: String,
		required: true
	},
	rate: {
		type: [ rateSchema ],
		default: []
	},
	onStock: {
		type: Number,
		default: 0
	},
	slug: {
		type: String,
		required: true,
		unique: true
	}
}, {
	timestamps: true
})

productSchema.methods.toJSON = function () {

	const { __v, ...product } = this.toObject()

	return product
}
productSchema.static( 'getProductsByCategory', getProductsByCategory )