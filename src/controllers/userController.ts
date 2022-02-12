import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import Users from '../models/Users'
import { IUser, IUserAddress } from '../models/Users/interfaces'
import { setUserToken, getUserID } from '../helpers/jwt'


export const signUp: RequestHandler = async ( req, res ) => {

	const newUserData: IUser = req.body
	let user = await Users.findOne({ email: newUserData.email })

	if( user ) {
		
		return res.status( 400 ).json({
			ok: false,
			msg: 'Ya hay un usuario registrado con esa cuenta.'
		})
	}

	user = new Users( newUserData )
	const hashedPassword = Users.hashPassword( user.password )

	try {

		user.password = hashedPassword
		await user.save()	
	} catch ( error ) {

        console.log("🚀 ~ file: userController.ts ~ line 31 ~ constsignUp:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	const token = setUserToken( user._id )

	return res.status( 200 ).json({
		ok: true,
		user,
		token
	})
}

export const logIn: RequestHandler = async ( req, res ) => {

	const { email, password }: IUser = req.body
	const user = await Users.findOne({ email })

	if( !user ) {
		
		return res.status( 400 ).json({
			ok: false,
			msg: 'No hay un usuario registrado con esa cuenta.'
		})
	}

	const isCorrectPassword = Users.comparePasswords( password, user.password )

	if( !isCorrectPassword ) {

		return res.status( 400 ).json({
			ok: false,
			msg: 'Contraseña incorrecta'
		})
	}

	const token = setUserToken( user._id )

	return res.status( 200 ).json({
		ok: true,
		user,
		token
	})
}

export const refreshToken: RequestHandler = async ( req, res ) => {

	const token = req.headers['x-token'] as string
	let uid: string
	
	try {
		
		uid = getUserID( token )
	} catch ( error ) {

		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	const user = await Users.findOne({ _id: uid })
	
	try {
		
		jwt.verify( token, process.env.JWT_SEED, { ignoreExpiration: true } )
	} catch ( error ) {
		
		console.log("🚀 ~ file: userController.ts ~ line 128 ~ constrefreshToken:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	return res.status( 200 ).json({
		ok: true,
		user,
		token
	})
}

export const logOut: RequestHandler = ( req, res ) => {

	return res.status( 200 ).json({
		ok: true
	})
}

export const addNewAddress: RequestHandler<{ uid: string }, unknown, IUserAddress> = async ( req, res ) => {

	const { uid } = req.params
	const {
		delegation,
		email,
		houseNumber,
		name,
		phone,
		state,
		street,
		suburb,
		zip, 
		lastName = ''
	} = req.body

	try {
		const newAddress: IUserAddress = {
			delegation,
			email, 
			houseNumber, 
			name, 
			phone, 
			state, 
			street, 
			suburb, 
			zip, 
			lastName
		}
		
		await Users.findByIdAndUpdate( uid, {
			$addToSet: {
				address: newAddress
			}
		})

		return res.status( 200 ).json({
			ok: true,
			msg: 'Dirección Agregada'
		})
	} catch ( error ) {

        console.log("🚀 ~ file: userController.ts ~ line 142 ~ constaddNewAddress:RequestHandler<{uid:string},any,IUserAddress>= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}
}

export const changeAvatar: RequestHandler = async ( req, res ) => {

	const token = req.headers['x-token'] as string

	if( !req.files ) {
		
		return res.status( 400 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal o faltan las imagenes'
		})
	} 

	try {

		req.body = req.files
		const { image } = req.body
		const imagePath = image[0].path.replace('public/', '')

		const uid = getUserID( token )

		await Users.findByIdAndUpdate( uid, {
			$set: {
				avatar: imagePath
			}
		})

		return res.status( 201 ).json({
			ok: true,
			msg: 'Avatar Actualizado',
			imagePath
		})
		
	} catch ( error ) {
		
        console.log("🚀 ~ file: userController.ts ~ line 186 ~ constchangeAvatar:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}
}

interface IUpdateUserProfile {
	name: string
	lastName: string	
}
export const updateUserProfile: RequestHandler<unknown, unknown, IUpdateUserProfile> = async ( req, res ) => {
	
	const { lastName, name } = req.body

	try {

		const token = req.headers['x-token'] as string
		const uid = getUserID( token )

		await Users.findByIdAndUpdate( uid, {
			$set: {
				name,
				lastName
			}
		})

		return res.status( 200 ).json({
			ok: true,
			msg: 'Usuario actualizado'
		})
	} catch ( error ) {
		
        console.log("🚀 ~ file: userController.ts ~ line 220 ~ constupdateUserProfile:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}
}