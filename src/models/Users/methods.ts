import bcrypt from 'bcrypt'


export function hashPassword( password: string ) {

	const salt = bcrypt.genSaltSync()

	return bcrypt.hashSync( password, salt )
}

export function comparePasswords( passwordFromBody: string, userPassword: string ) {

	return bcrypt.compareSync( passwordFromBody, userPassword )
}