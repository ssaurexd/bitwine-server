import { RequestHandler } from 'express'

export const indexUser: RequestHandler = ( req, res ) => {
	res.send({
		ok: true
	})
}