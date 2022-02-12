import jwt from 'jsonwebtoken'

import { IUser } from '../models/Users/interfaces'


export interface IVerifyUser {
	_id: string
}
export const getUserID = ( token: string ): string => {


	const { _id }  = jwt.verify( token, process.env.JWT_SEED, { ignoreExpiration: true } ) as IVerifyUser

	return _id
}

export const setUserToken = ( _id: string, extraData?: IUser ): string => {

	const token = jwt.sign({
		_id,
		...extraData
	}, process.env.JWT_SEED, { expiresIn: '3h' } )

	return token
}
