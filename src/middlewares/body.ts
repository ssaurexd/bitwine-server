import { validationResult } from 'express-validator'
import { RequestHandler } from 'express'

export const validateBody: RequestHandler = ( req, res, next ) => {
	
	const errors = validationResult( req )

	if( !errors.isEmpty() ) {

		return res.status( 400 ).json({
			ok: false,
			errors: errors.array(),
			msg: 'Revisa tu datos, hay campos faltantes'
		})
	}

	next()
}
