import { Document, Types } from 'mongoose'
import { IUserAddress } from '../Users/interfaces';



export interface ISalesBase {
	totalItems: number,
	total: number,
	shipment: IShipment,
	products: string[],
	uid?: Types.ObjectId,
	email: string,
	address: IUserAddress,
	status?: ISalesStatus
} 

export interface ISalesSchema extends ISalesBase, Document {
}

export type ISalesStatus = 'pending' | 'sent' | 'late' | 'done'
export interface IShipment {
	name: string,
	price: number
}