import { validationResult } from 'express-validator'
import { RequestHandler } from 'express'


export const validateBody: RequestHandler = ( req, res, next ) => {
	
	const errors = validationResult( req )

	if( !errors.isEmpty() ) {

		return res.status( 401 ).json({
			ok: false,
			errors: errors.array()
		})
	}

	next()
}