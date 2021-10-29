import { model } from 'mongoose'
import { IBanner, IBannerModel } from './interfaces'
import { bannerSchema } from './schema'


const Banner = model<IBanner, IBannerModel>( 'banner', bannerSchema )

export default Banner