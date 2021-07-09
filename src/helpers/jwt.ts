import { Request } from 'express'
import jwt from 'jsonwebtoken'


export const getUserID = ( token: string ) => {

	const { _id }: any = jwt.verify( token, process.env.JWT_SEED )

	return _id
}

export const setToken = ( _id: string, extraData?: object ): string => {

	const token = jwt.sign({
		_id,
		...extraData
	}, process.env.JWT_SEED )

	return token
}