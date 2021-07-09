import mongoose from 'mongoose'


class Database {

	public init = async () => {

		try {

			await mongoose.connect( process.env.MONGO_URL, { 
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false
			})
			console.log( 'Database ON' )
		} catch ( error ) {

			console.log('Database Error: ',  error )
			throw new Error( 'Database OFF' )
		}
	}
}

export default Database