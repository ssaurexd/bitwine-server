import { Schema } from 'mongoose'

import { IBanner, IBannerModel } from './interfaces'


export const bannerSchema = new Schema<IBanner, IBannerModel>({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	productSlug: {
		type: String,
		required: true
	},
	isActive: {
		type: Boolean,
		default: true
	}
}, {
	timestamps: true
})

bannerSchema.methods.toJSON = function () {

	const { __v, ...banner } = this.toObject()

	return banner
}