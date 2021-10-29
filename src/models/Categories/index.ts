import { model } from 'mongoose'
import { categorySchema } from './schemas'


const Category = model( 'category', categorySchema )

export default Category