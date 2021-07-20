import { model } from 'mongoose'

import { IProduct, IProductModel } from './interfaces'
import { productSchema } from './schemas'


const Product = model<IProduct, IProductModel>( 'product', productSchema )

export default Product