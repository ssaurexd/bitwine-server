import { Schema } from 'mongoose'

import { ICategory } from './interfaces'


export const categorySchema = new Schema<ICategory>({
	name: {
		type: String,
		required: true,
		unique: true
	}
}, {
	timestamps: true
})