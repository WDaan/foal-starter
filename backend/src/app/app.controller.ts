import { controller, Get, render, TokenRequired } from '@foal/core'

import { TodoController } from './controllers'
import { AuthController } from './controllers'
import { SignupController } from './controllers'

export class AppController {
    subControllers = [
        controller('/api/auth', AuthController),
        controller('/api/todos', TodoController),
        controller('/api/signup', SignupController)
    ]
}
