import { Router } from 'express'

import {
	getBanners
} from '../controllers/bannerController'


const bannerRouter = Router()

bannerRouter.route( '/' )
	.get(
		getBanners
	)

export default bannerRouter