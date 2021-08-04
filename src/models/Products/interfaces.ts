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
	categories: Types.ObjectId[],
	images?: string[],
	image: string,
	rate?: IRate[],
	onStock: number,
}

export interface IProductModel extends Model<IProduct> {
	getProductsByCategory: ( category: string, limit?: number ) => Promise<IProduct[]>
}