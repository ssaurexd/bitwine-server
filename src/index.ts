import dotenv from 'dotenv'
dotenv.config()

import Server from './config/server'


const app = new Server()
app.init()