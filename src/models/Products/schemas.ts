import { Schema } from 'mongoose'

import { IProduct, IProductModel } from './interfaces'
import { categorySchema } from '../Categories/schemas'


export const rateSchema = new Schema({
	uid: {
		type: Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
		unique: true
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
	discount: {
		type: Number,
		default: 0
	},
	categories: {
		type: [ categorySchema ],
		required: true
	},
	images: {
		type: [ String ]
	},
	rate: {
		type: [ rateSchema ]
	},
	onStock: {
		type: Number,
		default: 0
	}
}, {
	timestamps: true
})