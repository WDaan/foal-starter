// 3p
import {
    Context,
    dependency,
    HttpResponseRedirect,
    Post,
    setSessionCookie,
    ValidateBody,
    HttpResponseBadRequest,
    HttpResponseOK
} from '@foal/core'
import { isCommon } from '@foal/password'
import { TypeORMStore } from '@foal/typeorm'
import { getRepository } from 'typeorm'

// App
import { User } from '../entities'
import { JWTSign } from '../helpers'

export class SignupController {
    @dependency
    store: TypeORMStore

    @Post()
    @ValidateBody({
        additionalProperties: false,
        properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            firstname: { type: 'string' },
            lastname: { type: 'string' }
        },
        required: ['email', 'password'],
        type: 'object'
    })
    async signup(ctx: Context) {
        // Check that the password is not too common.
        if (await isCommon(ctx.request.body.password)) {
            return new HttpResponseBadRequest({
                message: 'Password is too common'
            })
        }

        // Check that no user has already signed up with this email.
        let user = await getRepository(User).findOne({
            email: ctx.request.body.email
        })
        if (user) {
            return new HttpResponseBadRequest({
                message: 'User allready exists'
            })
        }

        // Create the user.
        user = new User()
        user.email = ctx.request.body.email
        user.firstname = ctx.request.body.firstname
        user.lastname = ctx.request.body.lastname
        await user.setPassword(ctx.request.body.password)
        await getRepository(User).save(user)

        // Create a token associated with the user.
        const token = JWTSign(user.id, user.email)

        return new HttpResponseOK({
            message: 'Registered succesfully!',
            token
        })
    }
}
