import { Router } from 'express'
import { body } from 'express-validator'

import {
	signUp,
	logIn,
	refreshToken,
	logOut,
	addNewAddress
} from '../controllers/userController'
import { validateBody } from '../middlewares/body'
import { isAuthenticated } from '../middlewares/auth'


const userRouter = Router()

userRouter.post( '/signup',
	[
		body('email').not().isEmpty().withMessage('El email es requerido.').isEmail().withMessage('Introduce un email valido'),
		body('password').not().isEmpty().withMessage('La contraseña es requerida'),
		body('name').not().isEmpty().withMessage('El nombre es requerida'),
		validateBody
	],
	signUp
)

userRouter.post( '/login',
	[
		body('email').not().isEmpty().withMessage('El email es requerido.').isEmail().withMessage('Introduce un email valido'),
		body('password').not().isEmpty().withMessage('La contraseña es requerida'),
		validateBody
	],
	logIn
)

userRouter.post( '/refresh-token',
	isAuthenticated,
	refreshToken
)

userRouter.post( '/logout', logOut )

userRouter.put( '/edit-address/:uid', 
	isAuthenticated,
	[
		body('delegation').not().isEmpty().withMessage('El campo delegation es requerido'),
		body('email').not().isEmpty().withMessage('El campo email es requerido'),
		body('houseNumber').not().isEmpty().withMessage('El campo houseNumber es requerido'),
		body('name').not().isEmpty().withMessage('El campo name es requerido'),
		body('phone').not().isEmpty().withMessage('El campo phone es requerido'),
		body('state').not().isEmpty().withMessage('El campo state es requerido'),
		body('street').not().isEmpty().withMessage('El campo street es requerido'),
		body('suburb').not().isEmpty().withMessage('El campo suburb es requerido'),
		body('zip').not().isEmpty().withMessage('El campo zip es requerido'),
		validateBody
	],
	addNewAddress
)

export default userRouter