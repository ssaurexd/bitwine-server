import { Schema } from 'mongoose'

import { ICategory } from './interfaces'


export const categorySchema = new Schema<ICategory>({
	value: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String,
		required: true,
	}
}, {
	timestamps: true
})

categorySchema.methods.toJSON = function () {

	const { __v, createdAt, updatedAt,  ...category } = this.toObject()

	return category
}