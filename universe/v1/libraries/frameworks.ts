import express from 'express'
import helmet from 'helmet'

const FrameworksLoader = (app : express.Application) => {
    app.use(helmet())
    app.use(express.json())
}

export default FrameworksLoader