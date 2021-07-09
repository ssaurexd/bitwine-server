import { Schema } from 'mongoose'

import { IUser, IUserModel } from './interfaces'
import {
	hashPassword,
	comparePasswords
} from './methods'


export const userSchema = new Schema<IUser, IUserModel>({
	email: {
		required: true,
		index: true,
		unique: true,
		lowercase: true,
		type: String
	},
	password: {
		required: true,
		type: String
	},
	name: {
		type: String,
		required: true
	}, 
	lastName: {
		type: String,
		required: true
	},
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin']
	}
}, {
	timestamps: true
})


/* eliminamos el __v, _id y contraseña de lo que regresa mongoose */
userSchema.methods.toJSON = function () {

	const { __v, password, ...user } = this.toObject()

	return user
}

userSchema.static( 'hashPassword', hashPassword )
userSchema.static( 'comparePasswords', comparePasswords )
