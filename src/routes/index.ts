import { Router } from 'express'

import userRouter from './userRoute'
import productRouter from './productRoute'
import categoryRouter from './categoryRoute'
import bannerRouter from './bannerRoute'
import storeRouter from './storeRoute'


const router = Router()

router.use( '/users', userRouter )
router.use( '/products', productRouter )
router.use( '/categories', categoryRouter )
router.use( '/banners', bannerRouter )
router.use( '/stores', storeRouter )

export default router