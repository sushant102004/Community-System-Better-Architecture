import { Env } from './loaders/env'
import { Logger } from './loaders/logger'
import server from './server'

(async () => {
    const app = await server()
    app.listen(process.env.PORT, () => {
        Logger.instance.info(`Server Started on port ${Env.variables.PORT}`)
    })
})()