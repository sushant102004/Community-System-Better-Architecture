import mongoose from "mongoose"
import { Env } from "./env"
import { Logger } from "./logger"

export class MongooseLoader {
    static instance : mongoose.Connection

    static async Loader () {
        if(Env.variables.MongoDB_URI) {
            mongoose.set('strictQuery', false)
            await mongoose.connect(Env.variables.MongoDB_URI).then(
                () => Logger.instance.info('Connected to MongoDB')
            ).catch((e) => {
                Logger.instance.error(e)
                process.exit(1)
            })
        }
    }
}