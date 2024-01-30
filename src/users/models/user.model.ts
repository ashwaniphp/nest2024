import { Column, Index, Model, Table } from 'sequelize-typescript'

@Table
export class User extends Model {
    @Column
    firstName: string

    @Column
    lastName: string

    @Column
    @Index({ unique: true, name: 'email-unique' })
    email: string

    @Column({ defaultValue: true })
    isActive: boolean
}
