import { hashPassword } from '@foal/core'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    firstname: string

    @Column({ nullable: true })
    lastname: string

    async setPassword(password: string) {
        this.password = await hashPassword(password)
    }
}
