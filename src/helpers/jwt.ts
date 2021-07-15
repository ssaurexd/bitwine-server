import jwt from 'jsonwebtoken'

import { IUser } from '../models/Users/interfaces'


export const getUserID = ( token: string ): any => {

	const { _id }: any = jwt.verify( token, process.env.JWT_SEED, { ignoreExpiration: true } )

	return _id
}

export const setUserToken = ( _id: string, extraData?: IUser ): string => {

	const token = jwt.sign({
		_id,
		...extraData
	}, process.env.JWT_SEED, { expiresIn: '3h' } )

	return token
}
