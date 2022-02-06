import { Schema, Types } from 'mongoose'
import { userAddressSchema } from '../Users/schemas'
import { ISalesSchema, IShipment } from './interfaces'

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
		required: false
	},
	email: {
		type: String,
		required: true
	},
	address: {
		type: userAddressSchema,
		required: true
	}
}, {
	timestamps: true
})