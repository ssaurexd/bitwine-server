import { Model } from 'mongoose'

import { ICategory } from '../Categories/interfaces'



export interface IProduct {
	name: string,
	description: string,
	price: number,
	discount: number,
	categories: ICategory,
	images: Array<string>,
	rate: Array<any>,
	onStock: Number,
}

export interface IProductModel extends Model<IProduct> {
}