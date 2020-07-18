import { controller, Get, HttpResponseOK } from '@foal/core'

import { TodoController } from './controllers'
import { AuthController } from './controllers'
import { SignupController } from './controllers'

export class AppController {
    subControllers = [
        controller('/api/auth', AuthController),
        controller('/api/todos', TodoController),
        controller('/api/signup', SignupController)
    ]

    @Get('/')
    async getVersion() {
        return new HttpResponseOK({
            msg: 'API server online 🚀',
            version: process.env.npm_package_version
        })
    }
}
