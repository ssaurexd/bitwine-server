import { Router } from 'express'

import userRouter from './userRoute'
import productRouter from './productRoute'
import categoryRouter from './categoryRoute'
import bannerRouter from './bannerRoute'
import storeRouter from './storeRoute'
import salesRouter from './salesRoute'


const router = Router()

router.use( '/users', userRouter )
router.use( '/products', productRouter )
router.use( '/categories', categoryRouter )
router.use( '/banners', bannerRouter )
router.use( '/stores', storeRouter )
router.use( '/sales', salesRouter )

export default router