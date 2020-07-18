// 3p
import {
    Context,
    dependency,
    Post,
    Session,
    ValidateBody,
    verifyPassword,
    HttpResponseOK,
    HttpResponseUnauthorized
} from '@foal/core'
import { JWTRequired } from '@foal/jwt'
import { getRepository } from 'typeorm'

import { User } from '../entities'
import { JWTSign } from '../helpers'

export class AuthController {
    @Post('/login')
    // Validate the request body.
    @ValidateBody({
        additionalProperties: false,
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
        },
        required: ['email', 'password'],
        type: 'object'
    })
    async login(ctx: Context) {
        const user = await getRepository(User).findOne({
            email: ctx.request.body.email
        })

        if (!user) {
            return new HttpResponseUnauthorized({
                message: "User doesn't exist"
            })
        }

        if (!(await verifyPassword(ctx.request.body.password, user.password))) {
            return new HttpResponseUnauthorized({
                message: 'Invalid password'
            })
        }

        // Create a token associated with the user.
        const token = JWTSign(user.id, user.email)

        return new HttpResponseOK({
            message: 'Logged in succesfully!',
            token
        })
    }

    @Post('/logout')
    @JWTRequired()
    async logout(ctx: Context<User, Session>) {
        const response = new HttpResponseOK({
            message: 'Logged out succesfully!'
        })
        //todo add token to redis blacklist
        //todo #2 cleanup expired jwt tokens
        return response
    }
}
