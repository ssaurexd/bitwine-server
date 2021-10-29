import { model } from 'mongoose'
import { IStore, IStoreModel } from './interfaces'
import { storeSchema } from './schemas'


const Store = model<IStore, IStoreModel>( 'store', storeSchema )

export default Store