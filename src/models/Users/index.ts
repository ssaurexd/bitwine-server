import { model } from 'mongoose'

import { userSchema } from './schemas'
import { IUser, IUserModel } from './interfaces'


const Users = model<IUser, IUserModel>( 'user', userSchema )

export default Users