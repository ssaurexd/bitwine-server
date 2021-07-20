import { Router } from 'express'

import userRouter from './userRoute'
import productRouter from './productRoute'



const router = Router()

router.use( '/users', userRouter )
router.use( '/products', productRouter )

export default router