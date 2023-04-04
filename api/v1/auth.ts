import express from 'express'
import AuthController from '../../controllers/v1/auth'

const AuthRouter = express.Router()

AuthRouter.route('/signup').post(AuthController.createAccount)
AuthRouter.route('/signin').post(AuthController.signin)
AuthRouter.route('/me').get(AuthController.getMe)


export default AuthRouter