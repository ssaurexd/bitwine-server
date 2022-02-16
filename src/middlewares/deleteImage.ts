import { RequestHandler } from 'express'
import path from 'path'
import fs from 'fs'

import { getUserID } from '../helpers/jwt'
import Users from '../models/Users'


export const deleteImage: RequestHandler = async ( req, res, next ) => {

	const token = req.headers['x-token'] as string
	const uid = getUserID( token )

	try {
		
		const user = await Users.findById( uid )
		const avatarDirPath = path.join(__dirname,  '../..', 'public/images/avatars')
		
		if( user.avatar?.length ) {
			
			fs.unlink( path.join( avatarDirPath, user.avatar.split('/')[ user.avatar.split('/').length -1 ] ), ( err ) =>  {
				next()
			})
		} else {

			next()
		}
	} catch ( error ) {
		
        console.log("🚀 ~ file: deleteImage.ts ~ line 15 ~ constdeleteImage:RequestHandler= ~ error", error)
		return res.status( 501 ).json({
			ok: false,
			msg: 'Oops! Algo salio mal.'
		})
	}
}