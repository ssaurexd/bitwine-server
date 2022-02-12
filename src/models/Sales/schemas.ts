import { Schema, Types } from 'mongoose'
import { ISalesSchema, IShipment } from './interfaces'
import { userAddressSchema } from '../Users/schemas'

import Users from '../Users'


export const shipmentSchema = new Schema<IShipment>({
	name: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
}, {
	timestamps: true
})

export const salesSchema = new Schema<ISalesSchema>({
	products: {
		type: [ Types.ObjectId ],
		required: true
	},
	shipment: {
		type: shipmentSchema,
		required: true
	},
	total: {
		type: Number,
		required: true
	},
	totalItems: {
		type: Number,
		required: true
	},
	uid: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: Users
	},
	email: {
		type: String,
		required: true
	},
	address: {
		type: userAddressSchema,
		required: true
	},
	status: {
		type: String,
		require: true,
		enum: [ 'pending', 'sent', 'late', 'done' ],
		default: 'pending'
	}
}, {
	timestamps: true
})