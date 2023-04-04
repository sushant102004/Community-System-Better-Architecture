import { sign, verify } from 'jsonwebtoken'
import { PlatformError } from '../../universe/v1/utils/platformError'
import { SavedUserDocument, User } from './../../schema/v1/user'
import bcrypt from 'bcrypt'
import express, { Request } from "express"


class AuthService {
    static createAccountService = async (name: string, email: string, password: string) => {
        return User.create({ name, email, password })
            .then((newUser) => {
                const accessToken = sign({ id: newUser.id }, 'JWT_Secret')

                return {
                    data: {
                        id: newUser.id,
                        name: newUser.name,
                        email: newUser.email,
                        created_at: newUser.created_at
                    },
                    meta: {
                        access_token: accessToken
                    }
                }
            }).catch((error) => {
                if (error.code === 11000 && error.keyPattern.email === 1) {
                    throw new PlatformError([{ message: 'AccountExists' }])
                } else {
                    throw error
                }
            })
    }


    static signIn = async (email: string, password: string) => {

        if (!email || !password) {
            throw new PlatformError([{ message: 'InvalidInput' }])
        }

        return await User.findOne({ email }).select('+password')
            .then(async (user) => {
                if (!user) {
                    console.log('User not found.')
                    throw new PlatformError([{ message: 'AccountNotFound' }])
                }

                if (!await bcrypt.compare(password, user.password)) {
                    throw new PlatformError([{ message: 'InvalidCredentials' }])
                }

                const accessToken = sign({ id: user.id }, 'JWT_Secret')
                return {
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    },
                    meta: {
                        access_token: accessToken
                    }
                }
            }).catch((error) => {
                console.log(error)
                throw error
            })
    }

    static getUserFromToken = async (req: express.Request) => {
        interface JwtPayload {
            id: number
        }

        let authToken
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            authToken = req.headers.authorization.split(' ')[1]
        } else {
            throw new PlatformError([{ message: 'InvalidToken' }])
        }

        const decoded = verify(authToken, 'JWT_Secret') as JwtPayload

        let me;

        await User.findOne({ id: decoded.id }).then(async (user) => {
            if (!user) {
                throw new PlatformError([{ message: 'AccountNotFound' }])
            }
            me = {
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at
                }
            }
        })
        return me
    }
}



export default AuthService