import { Model, Document } from 'mongoose'


export type Role = 'user' | 'admin'
export interface IUser extends Document {
	email: string,
	password: string,
	name: string,
	lastName?: string,
	role?: Role
}

export interface IUserModel extends Model<IUser> {
	hashPassword( password: string ): string,
	comparePasswords( passwordFromBody: string, userPassword: string ): boolean
}