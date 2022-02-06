import { model } from 'mongoose'
import { ISalesSchema } from './interfaces'
import { salesSchema } from './schemas'


const Sales = model<ISalesSchema>( 'sale', salesSchema )

export default Sales