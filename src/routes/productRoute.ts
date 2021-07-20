import { Router } from 'express'
import { body } from 'express-validator'

import { validateBody } from '../middlewares/body'
import { isAuthenticatedAndAdmin } from '../middlewares/auth'

const productRouter = Router()

productRouter.get( '/', isAuthenticatedAndAdmin, ( req, res ) => {
	res.send({msg: 'Hola desde producto'})
} )

export default productRouter