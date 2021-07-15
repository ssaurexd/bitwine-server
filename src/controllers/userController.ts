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

        console.log("🚀 ~ file: userController.ts ~ line 29 ~ constsignUp:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Parece que algo salio mal.'
		})
	}

	const token = setUserToken( user._id )

	req.session.access_token = token

	return res.status( 200 ).json({
		ok: true,
		user
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

	req.session.access_token = token

	return res.status( 200 ).json({
		ok: true,
		user
	})
}

export const refreshToken: RequestHandler = async ( req, res ) => {

	const { rememberMe } = req.body
    console.log("🚀 ~ file: userController.ts ~ line 84 ~ constrefreshToken:RequestHandler= ~ rememberMe", req.body)
	const oldToken = req.session.access_token
	const uid = getUserID( oldToken )
	const user = await User.findOne({ _id: uid })

	try {
	
		jwt.verify( oldToken, process.env.JWT_SEED )
	} catch ( error ) {
		
		if( rememberMe && error.name === 'TokenExpiredError') {
			
			const token = setUserToken( uid )

			req.session.access_token = token

			return res.status( 200 ).json({
				ok: true,
				user
			})
		} else if( rememberMe === false && error.name === 'TokenExpiredError' ) {

			return res.status( 401 ).json({
				ok: false,
				expired: true,
				msg: 'La sessión expiró.'
			})
		} else {

			console.log("🚀 ~ file: auth.ts ~ line 25 ~ constisAuthenticated:RequestHandler= ~ error", error)
			return res.status( 501 ).json({
				ok: false,
				msg: 'Oops! Algo salio mal.'
			})
		}

	}

	req.session.access_token = oldToken

	return res.status( 200 ).json({
		ok: true,
		user
	})
}