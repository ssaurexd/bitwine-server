import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import User from '../models/Users'
import { getUserID } from '../helpers/jwt'


export const isAuthenticated: RequestHandler = async ( req, res, next ) => {

	const token = req.session.access_token
	
	if( !token ) {
		
		console.log("🚀 ~ file: auth.ts ~ line 8 ~ constisAuthenticated:RequestHandler --> No hay token" )
		return res.status( 401 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	try {
		
		jwt.verify( token, process.env.JWT_SEED, { ignoreExpiration: true } )
	} catch ( error ) {
		
        console.log("🚀 ~ file: auth.ts ~ line 25 ~ constisAuthenticated:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	next()
}

export const isAuthenticatedAndAdmin: RequestHandler = async ( req, res, next ) => {

	const token = req.session.access_token
	
	if( !token ) {
		
		console.log("🚀 ~ file: auth.ts ~ line 8 ~ constisAuthenticated:RequestHandler --> No hay token" )
		return res.status( 401 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	try {
		
		jwt.verify( token, process.env.JWT_SEED, { ignoreExpiration: true } )
	} catch ( error ) {
		
        console.log("🚀 ~ file: auth.ts ~ line 25 ~ constisAuthenticated:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	const uid = getUserID( token )
	const { role } = await User.findById( uid )

	if( role !== 'admin' ) {

		return res.status( 401 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	next()
}