import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'


export const isAuthenticated: RequestHandler = async ( req, res, next ) => {

	const token = req.session.access_token

	if( !token ) {

		return res.status( 401 ).json({
			ok: false,
			msg: 'Sin autorización' // TODO-AURE: Cambiar este mesaje por seguridad
		})
	}

	try {
		
		jwt.verify( token, process.env.JWT_SEED )
	} catch ( error ) {
		
        console.log("🚀 ~ file: auth.ts ~ line 25 ~ constisAuthenticated:RequestHandler= ~ error", error)
		if( error.name === 'TokenExpiredError' ) {

			return res.status( 401 ).json({
				ok: false,
				msg: 'La sesión expiró',
				expiredAt: error.expiredAt
			})
		}

		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}

	next()
}