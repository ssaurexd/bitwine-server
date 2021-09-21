import { Model, Types } from 'mongoose'

import { ICategory } from '../Categories/interfaces'


export interface IRate {
	uid: Types.ObjectId,
	value: number
}
export interface IProduct {
	name: string,
	description: string,
	price: number,
	priceWithDiscount: number,
	discount?: number,
	categories: Types.ObjectId,
	images?: string[],
	image: string,
	rate?: IRate[],
	onStock: number,
	slug: string,
}

export interface IProductModel extends Model<IProduct> {
	getProductsByCategory: ( query: any, category: string, limit?: number, page?: number ) => Promise<{ products: IProduct[], total: number}>
}