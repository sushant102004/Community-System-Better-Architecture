/*
Objective: - Get intelligence for variable names.

Procedure: -
1. Create an array of all variables from .env
2. Create a variable Record<string, string | null> to store all user defined variables.
3. Loop through array and search for similar in process.env
4. Copy key and data from process.env into values.
5. Copy values into variables.
*/

import { Logger } from "./logger"

export class Env {
    // Array of environment variables declared in .evn file
    static names = ['PORT', 'MongoDB_URI'] as const

    // This trick will let will intelligence from 'name'.
    static variables : Record<typeof Env.names[number], string | null>

    static Loader() {
        // Record to store all values found from process.env
        const values : Record<string, string | null> = {}

        for(const key of Env.names) {
            const value = process.env[key]
            if(value) {
                values[key] = value
            } else {
                if(process.env.NODE_ENV === 'development') {
                    values[key] = null
                } else {
                    Logger.instance.error(`Enviroment variable ${key} is not defined}`)
                    process.exit(1)
                }
            }
        }

        Env.variables = values
    }
}