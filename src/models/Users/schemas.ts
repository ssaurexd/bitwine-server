import { Schema } from 'mongoose'

import { IUser, IUserAddress, IUserAddressModel, IUserModel } from './interfaces'
import {
	hashPassword,
	comparePasswords
} from './methods'

export const userAddressSchema = new Schema<IUserAddress, IUserAddressModel>({
	delegation: {
		required: true,
		type: String
	},
	name: {
		required: true,
		type: String
	},
	lastName: {
		required: false,
		type: String
	},
	email: {
		required: true,
		type: String
	},
	houseNumber: {
		required: true,
		type: String
	},
	phone: {
		required: true,
		type: String
	},
	state: {
		required: true,
		type: String
	},
	street: {
		required: true,
		type: String
	},
	suburb: {
		required: true,
		type: String
	},
	zip: {
		required: true,
		type: String
	}
}, {
	timestamps: true
})

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
		required: false
	},
	role: {
		type: String,
		default: 'user',
		enum: ['user', 'admin']
	},
	address: {
		type: [ userAddressSchema ],
		required: false
	},
	avatar: {
		type: String,
		require: false
	}
}, {
	timestamps: true
})


/* eliminamos el __v y contraseña de lo que regresa mongoose */
userSchema.methods.toJSON = function () {

	const { __v, password, ...user } = this.toObject()

	return user
}

userSchema.static( 'hashPassword', hashPassword )
userSchema.static( 'comparePasswords', comparePasswords )
