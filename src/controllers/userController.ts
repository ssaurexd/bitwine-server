import { RequestHandler } from 'express'

import User from '../models/Users'
import { IUser } from '../models/Users/interfaces'
import { setToken } from '../helpers/jwt'


export const signUp: RequestHandler = async ( req, res ) => {

	const newUserData: IUser = req.body
	let user = await User.findOne({ email: newUserData.email })

	if( user ) {
		
		return res.status( 401 ).json({
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

        console.log("🚀 ~ file: userController.ts ~ line 29 ~ constsignUp:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Parece que algo salio mal.'
		})
	}

	const token = setToken( user._id )

	req.session.access_token = token
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
		
		return res.status( 401 ).json({
			ok: false,
			msg: 'No hay un usuario registrado con esa cuenta.'
		})
	}

	const isCorrectPassword = User.comparePasswords( password, user.password )

	if( !isCorrectPassword ) {

		return res.status( 401 ).json({
			ok: false,
			msg: 'Contraseña incorrecta'
		})
	}
	
	const token = setToken( user._id )

	req.session.access_token = token
	return res.status( 200 ).json({
		ok: true,
		user,
		token
	})
}