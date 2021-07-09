import { Router, RequestHandler } from 'express'

import {
	indexUser
} from '../controllers/userController'


const router = Router()

router.use('/users',
	indexUser
)

export default router