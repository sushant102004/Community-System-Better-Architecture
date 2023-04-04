import express from "express"

import AuthService from "../../services/v1/auth"

class AuthController {
    static createAccount = async (request: express.Request, response: express.Response) => {
        const newUser = await AuthService.createAccountService(
            request.body.name,
            request.body.email,
            request.body.password,
        )

        return response.status(200).json({
            status: true,
            content : newUser
        })
    }

    static signin = async (request: express.Request, response: express.Response) => {
        const user = await AuthService.signIn(
            request.body.email,
            request.body.password
        )

        return response.status(200).json({
            status: true,
            content: user
        })
    }

    static getMe = async (request: express.Request, response: express.Response) => {
        const me = await AuthService.getUserFromToken(request)

        return response.status(200).json({
            status: true,
            content: me
        })
    }
}

export default AuthController