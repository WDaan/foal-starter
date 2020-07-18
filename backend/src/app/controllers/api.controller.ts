import { Context, Get, HttpResponseOK } from '@foal/core'

export class ApiController {
    @Get('/')
    foo(ctx: Context) {
        return new HttpResponseOK()
    }
}
