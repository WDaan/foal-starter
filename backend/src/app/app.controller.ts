import { controller, Get, render, TokenRequired } from '@foal/core'
import { TypeORMStore } from '@foal/typeorm'

import { TodoController } from './controllers'
import { AuthController } from './controllers'
import { SignupController } from './controllers'

export class AppController {
    subControllers = [
        controller('/auth', AuthController),
        controller('/api', TodoController),
        controller('/signup', SignupController)
    ]

    @Get('/')
    @TokenRequired({
        // The session token is expected to be in a cookie.
        cookie: true,
        // Redirect the user to /signin if they are not logged in.
        redirectTo: '/signin',
        // Specify the "store" where the session was created.
        store: TypeORMStore
    })
    index() {
        return render('public/index.html')
    }

    @Get('/signin')
    signin() {
        return render('public/signin.html')
    }

    @Get('/signup')
    signup() {
        return render('public/signup.html')
    }
}
