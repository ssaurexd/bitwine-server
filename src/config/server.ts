import express from 'express'
import cookieSession from 'cookie-session'
import cors from 'cors'

import Database from './database'
import routes from '../routes'


class Server {

	private app = express()
	private db = new Database()

	public init = () => {

		this.db.init()
		this.middlewares()
	}

	private middlewares = () => {

		/* directorio publico */
		this.app.use( express.static('public') )
		this.initCors()
		/* habilitar el body */
		this.app.use( express.urlencoded({ extended: true }) )
		this.initCookieSession()
		this.initRoutes()
		this.initServer()
	}

	
	private initCors = () => {

		this.app.use( cors({
			origin: 'http://localhost:3001',
			optionsSuccessStatus: 200,
			credentials: true
		}))
	}

	private initCookieSession = () => {

		this.app.use( cookieSession({
			name: 'access_token',
			keys: ['key1', 'key2'],
			httpOnly: true
		}))
	}

	private initRoutes = () => {

		this.app.use( '/api', routes )
	}

	private initServer = () => {

		this.app.listen( process.env.PORT, () => {

			console.log(`Server ON --> ${ process.env.BASE_PATH }:${ process.env.PORT }`)
		})
	}
}

export default Server