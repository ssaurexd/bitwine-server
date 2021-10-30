import express from 'express'
import cookieSession from 'cookie-session'
import cors from 'cors'
import multer from 'multer'
import path from 'path'

import Database from './database'
import routes from '../routes'


class Server {

	private app = express()
	private db = new Database()
	private upload = multer()

	public init = (): void => {

		this.db.init()
		this.middlewares()
	}

	private middlewares = () => {

		/* directorio publico */
		this.app.use( express.static( path.resolve('public') ) )
		this.initCors()
		/* habilitar el body */
		this.app.use( express.urlencoded({ extended: true }) )
		this.app.use( express.json() )

		this.initCookieSession()
		this.initRoutes()
		this.initServer()
	}

	
	private initCors = () => {

		this.app.use( cors({
			origin: 'https://bitwine-client-9oznh4g0a-ssaurexd-gmailcom.vercel.app',
			optionsSuccessStatus: 200,
			credentials: true
		}))
	}

	private initCookieSession = () => {

		this.app.use( cookieSession({
			name: 'access_token',
			keys: ['key1', 'key2'],
			httpOnly: true,
			path: '/'
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