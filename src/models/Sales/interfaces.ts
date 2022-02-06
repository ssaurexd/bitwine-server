import { Document, Types } from 'mongoose'
import { IUserAddress } from '../Users/interfaces';



export interface ISalesBase {
	totalItems: number,
	total: number,
	shipment: IShipment,
	products: string[],
	uid?: Types.ObjectId,
	email: string,
	address: IUserAddress
} 

export interface ISalesSchema extends ISalesBase, Document {
}

export interface IShipment {
	name: string,
	price: number
}