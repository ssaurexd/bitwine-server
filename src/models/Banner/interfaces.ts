import { Model, Document } from 'mongoose'


export interface IBanner {
	title: string
	description: string
	productSlug: string,
	isActive: boolean
}
export interface IBannerModel extends Model<IBanner> {

}