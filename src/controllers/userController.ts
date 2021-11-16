import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/Users'
import { IUser } from '../models/Users/interfaces'
import { setUserToken, getUserID } from '../helpers/jwt'


export const signUp: RequestHandler = async ( req, res ) => {

	const newUserData: IUser = req.body
	let user = await User.findOne({ email: newUserData.email })

	if( user ) {
		
		return res.status( 400 ).json({
			ok: false,
			msg: 'Ya hay un usuario registrado con esa cuenta.'
		})
	}

	user = new User( newUserData )
	const hashedPassword = User.hashPassword( user.password )

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
	const user = await User.findOne({ email })

	if( !user ) {
		
		return res.status( 400 ).json({
			ok: false,
			msg: 'No hay un usuario registrado con esa cuenta.'
		})
	}

	const isCorrectPassword = User.comparePasswords( password, user.password )

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
	let uid: any 
	
	try {
		
		uid = getUserID( token )
	} catch ( error ) {

		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	const user = await User.findOne({ _id: uid })
	
	try {
		
		jwt.verify( token, process.env.JWT_SEED )
	} catch ( error ) {
		
		if( error.name === 'TokenExpiredError' ) {

			return res.status( 401 ).json({
				ok: false,
				expired: true,
				msg: 'La sessión expiró.'
			})
		} else {

			console.log("🚀 ~ file: userController.ts ~ line 128 ~ constrefreshToken:RequestHandler= ~ error", error)
			return res.status( 501 ).json({
				ok: false,
				msg: 'Oops! Algo salio mal.'
			})
		}
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