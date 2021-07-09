import { Router } from 'express'
import { body } from 'express-validator'

import {
	signUp,
	logIn
} from '../controllers/userController'
import { validateBody } from '../middlewares/body'


const userRouter = Router()

userRouter.post( '/signup',
	[
		body('email').not().isEmpty().withMessage('El email es requerido.').isEmail().withMessage('Introduce un email valido'),
		body('password').not().isEmpty().withMessage('La contraseña es requerida'),
		body('name').not().isEmpty().withMessage('El nombre es requerida'),
		body('lastName').not().isEmpty().withMessage('El apellido es requerida'),
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

export default userRouter