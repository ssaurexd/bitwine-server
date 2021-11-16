import { Router } from 'express'
import { body } from 'express-validator'

import {
	signUp,
	logIn,
	refreshToken,
	logOut
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

export default userRouter