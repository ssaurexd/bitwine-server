import mongoose from 'mongoose'


class Database {

	protected connectDB = async (): Promise<void> => {

		try {

			await mongoose.connect( process.env.MONGO_URL )
			console.log( 'Database ON' )
		} catch ( error ) {

			console.log('Database Error: ',  error )
			throw new Error( 'Database OFF' )
		}
	}
}

export default Database