// 3p
import { createConnection } from 'typeorm'

// App
import { Todo, User } from '../app/entities'

export const schema = {
    properties: {
        user: { type: 'string', format: 'email' },
        text: { type: 'string' }
    },
    required: ['user', 'text'],
    type: 'object'
}

export async function main(args: { user: string; text: string }) {
    const connection = await createConnection()
    try {
        const user = await connection
            .getRepository(User)
            .findOne({ email: args.user })

        if (!user) {
            console.log('No user was found with the email ' + args.user)
            return
        }

        const todo = new Todo()
        todo.text = args.text
        todo.user = user

        console.log(await connection.manager.save(todo))
    } catch (error) {
        console.log(error.message)
    } finally {
        await connection.close()
    }
}
