import { Config } from '@foal/core'
import { sign } from 'jsonwebtoken'

export function JWTSign(id: number, email: string) {
    const sub = id.toString()

    return sign(
        {
            sub: sub as any,
            email
        },
        Config.get<string>('settings.jwt.secretOrPublicKey'),
        { expiresIn: '15min' }
    )
}
