import { JWTSign } from '../helpers'

import { Hook, HookDecorator, HttpResponse } from '@foal/core'
export function JWTRefresh(): HookDecorator {
    return Hook(ctx => {
        if (!ctx.user) {
            return
        }

        return (response: HttpResponse) => {
            const newToken = JWTSign(ctx.user.id, ctx.user.email)
            response.setHeader('New_Authorization', newToken)
        }
    })
}
