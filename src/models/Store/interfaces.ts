import { Model, Types } from 'mongoose'

export type IStoreType = 'shopCart' | 'wishList'
export interface IStore{
	uid: Types.ObjectId,
	type: IStoreType,
	products: IStoreProduct[]	
}

export interface IStoreModel extends Model<IStore> {

}

export interface IStoreProduct {
	_id: string,
	count: number,
	name: string,
	description: string,
	price: number,
	priceWithDiscount: number,
	discount?: number,
	image: string,
	slug: string
}