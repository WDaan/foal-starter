// 3p
import { isCommon } from '@foal/password'
import { createConnection } from 'typeorm'

// App
import { User } from '../app/entities'

export const schema = {
    additionalProperties: false,
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' }
    },
    type: 'object'
}

export async function main(args: {
    email: string
    password: string
    firstname: string
    lastname: string
}) {
    const connection = await createConnection()

    if (!args.email) args.email = 'dev@test.com'
    if (!args.firstname) args.firstname = 'dev'
    if (!args.lastname) args.lastname = 'dev'
    if (!args.password) args.password = 'dev_password'

    try {
        const user = new User()
        user.email = args.email
        user.firstname = args.firstname
        user.lastname = args.lastname

        if (await isCommon(args.password)) {
            console.log(
                'This password is too common. Please choose another one.'
            )
            return
        }
        await user.setPassword(args.password)

        console.log(await connection.manager.save(user))
    } catch (error) {
        console.log(error.message)
    } finally {
        await connection.close()
    }
}
