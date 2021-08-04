import { Router } from 'express'

import userRouter from './userRoute'
import productRouter from './productRoute'
import categoryRouter from './categoryRoute'


const router = Router()

router.use( '/users', userRouter )
router.use( '/products', productRouter )
router.use( '/categories', categoryRouter )

export default router