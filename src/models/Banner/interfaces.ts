import { Model, Document } from 'mongoose'


export interface IBannerForHome extends IBanner {
	productImg: string
}
export interface IBanner extends Document {
	title: string
	description: string
	productSlug: string,
	isActive: boolean,
	productImg: string
}
export interface IBannerModel extends Model<IBanner> {
}