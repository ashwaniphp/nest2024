import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column({ length: 200, unique: true })
    email: string

    @Column({ default: true })
    isActive: boolean

    @Column({ select: false })
    pass: string

    @CreateDateColumn({ select: false })
    public createdAt: Date

    @UpdateDateColumn({
        onUpdate: 'CURRENT_TIMESTAMP',
        select: false,
    })
    @Exclude()
    public updatedAt: Date
}
