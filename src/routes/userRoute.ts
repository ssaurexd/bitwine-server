import { Router } from 'express'
import { body } from 'express-validator'

import * as userController from '../controllers/userController'
import { validateBody } from '../middlewares/body'
import { isAuthenticated } from '../middlewares/auth'
import { avatarImageMulter } from '../config/multer'
import { deleteImage } from '../middlewares/deleteImage'


const userRouter = Router()

userRouter.post( '/signup',
	[
		body('email').not().isEmpty().withMessage('El email es requerido.').isEmail().withMessage('Introduce un email valido'),
		body('password').not().isEmpty().withMessage('La contraseña es requerida'),
		body('name').not().isEmpty().withMessage('El nombre es requerida'),
		validateBody
	],
	userController.signUp
)

userRouter.post( '/login',
	[
		body('email').not().isEmpty().withMessage('El email es requerido.').isEmail().withMessage('Introduce un email valido'),
		body('password').not().isEmpty().withMessage('La contraseña es requerida'),
		validateBody
	],
	userController.logIn
)

userRouter.post( '/refresh-token',
	isAuthenticated,
	userController.refreshToken
)

userRouter.post( '/logout', userController.logOut )

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
	userController.addNewAddress
)

userRouter.put( '/change-avatar', 
	isAuthenticated,
	avatarImageMulter.fields([
		{ name: 'image', maxCount: 1 },
	]),
	deleteImage,
	userController.changeAvatar
)

userRouter.put( '/edit-user', 
	isAuthenticated,
	[
		body('name').not().isEmpty().withMessage('El campo name es obligatorio'),
		body('lastName').not().isEmpty().withMessage('El campo lastName es obligatorio'),
		validateBody
	],
	userController.updateUserProfile
)

export default userRouter