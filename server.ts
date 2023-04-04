import 'express-async-errors'
import express from 'express'
import AuthRouter from './api/v1/auth'
import { Env } from './loaders/env'
import { Logger } from './loaders/logger'
import { MongooseLoader } from './loaders/mongoose'
import FrameworksLoader from './universe/v1/libraries/frameworks'
import ErrorHandler from './universe/v1/utils/errorHandler'

const server = async () : Promise<express.Application> => {
    const app = express()
    Logger.Loader()
    Env.Loader()
    FrameworksLoader(app)
    MongooseLoader.Loader()

    app.use('/v1/auth/', AuthRouter)

    app.use(ErrorHandler)
    return app
}

export default server