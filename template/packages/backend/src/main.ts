import { Factory, addGuard, addMiddleware, bindApp } from 'phecda-server'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import modules from './modules'
dotenv.config()
const app = express()
async function start() {
  const data = await Factory(modules)
  data.output()
  app.use(express.json())
  app.use(cors())

//   addMiddleware('upload', uploadMiddleware)

//   addGuard('jwt', jwtGuard())

  bindApp(app, data, { })
  app.listen(3000)
}

start()
