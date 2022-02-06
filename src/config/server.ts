import express from 'express'
import cors from 'cors'
import path from 'path'

import Database from './database'
import routes from '../routes'


class Server extends Database {

	private app = express()

	public init = async () => {
		await this.connectDB()
		this.middlewares()
	}

	private middlewares = () => {

		/* directorio publico */
		this.app.use( express.static( path.resolve('public') ) )
		this.initCors()
		/* habilitar el body */
		this.app.use( express.urlencoded({ extended: true }) )
		this.app.use( express.json() )
		
		this.initRoutes()
		this.initServer()
	}

	
	private initCors = () => {

		const whiteList: string[] = [
			'https://bitwine-client.herokuapp.com',
			'http://localhost:3000'
		]
		this.app.use( cors({
			origin: ( origin, cb ) => {

				if( whiteList.indexOf( origin ) !== -1 || !origin ) cb( null, true )
				else cb( new Error('Not allowed by cors') )
			},
			optionsSuccessStatus: 200,
			credentials: true,
		}))
	}

	private initRoutes = () => {

		this.app.use( '/api', routes )
	}

	private initServer = () => {

		this.app.listen( process.env.PORT || 3000, () => {

			console.log(`Server ON --> ${ process.env.BASE_PATH }:${ process.env.PORT }`)
		})
	}
}

export default Server