import { Model, Document } from 'mongoose'


export type Role = 'user' | 'admin'
export interface IUser extends Document {
	email: string,
	password: string,
	name: string,
	lastName?: string,
	role?: Role,
	address?: IUserAddress[],
	avatar?: string
}

export interface IUserAddress {
	name: string,
	lastName?: string,
	street: string,
	houseNumber: string,
	zip: string,
	phone: string,
	email: string,
	suburb: string,
	delegation: string,
	state: string
}

export interface IUserModel extends Model<IUser> {
	hashPassword( password: string ): string,
	comparePasswords( passwordFromBody: string, userPassword: string ): boolean
}
export interface IUserAddressModel extends Model<IUserAddress> {
}