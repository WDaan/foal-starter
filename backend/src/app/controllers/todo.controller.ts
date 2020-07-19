import {
    Context,
    Delete,
    Get,
    HttpResponseCreated,
    Put,
    HttpResponseNotFound,
    HttpResponseOK,
    Post,
    ValidateBody,
    ValidatePathParam
} from '@foal/core'
import { getRepository } from 'typeorm'

import { Todo, User } from '../entities'
import { JWTRequired } from '@foal/jwt'
import { JWTRefresh } from '../hooks'
import { fetchUser } from '@foal/typeorm'

@JWTRequired({ user: fetchUser(User) })
@JWTRefresh()
export class TodoController {
    @Get('/')
    async getTodos(ctx: Context) {
        const todos = await getRepository(Todo).find({ user: ctx.user })
        return new HttpResponseOK(todos)
    }

    @Get('/deleted')
    async getDeletedTodos(ctx: Context) {
        const todos = await getRepository(Todo)
            .createQueryBuilder('todo')
            .where('userId = :id', { id: ctx.user.id })
            .getMany()

        return new HttpResponseOK(todos)
    }

    @Post('/')
    @ValidateBody({
        additionalProperties: false,
        properties: {
            text: { type: 'string' }
        },
        required: ['text'],
        type: 'object'
    })
    async postTodo(ctx: Context) {
        const todo = new Todo()
        todo.text = ctx.request.body.text
        // Make the current user the owner of the todo.
        todo.user = ctx.user

        await getRepository(Todo).save(todo)

        return new HttpResponseCreated(todo)
    }

    @Delete('/:id')
    @ValidatePathParam('id', { type: 'number' })
    async deleteTodo(ctx: Context) {
        const todo = await getRepository(Todo).findOne({
            id: +ctx.request.params.id,
            // Do not return the todo if it does not belong to the current user.
            user: ctx.user
        })
        if (!todo) {
            return new HttpResponseNotFound()
        }
        await getRepository(Todo).softDelete(todo.id)
        return new HttpResponseOK({
            todo,
            message: 'Todo deleted succesfully'
        })
    }

    @Put('/:id/restore')
    @ValidatePathParam('id', { type: 'number' })
    async restoreTodo(ctx: Context) {
        const todo = await getRepository(Todo).findOne({
            id: +ctx.request.params.id,
            // Do not return the todo if it does not belong to the current user.
            user: ctx.user
        })
        if (!todo) {
            return new HttpResponseNotFound()
        }
        await getRepository(Todo).restore(todo.id)
        return new HttpResponseOK({
            todo,
            message: 'Todo restored succesfully'
        })
    }
}
