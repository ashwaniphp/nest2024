import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/entities/user.entity'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { genSaltSync, hashSync, compareSync } from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<User | object> {
        createUserDto.pass = await this.hashPassword(createUserDto.pass)
        return await this.usersService.create(createUserDto)
    }

    async signIn(email: string, pass: string): Promise<any> {
        const userData = await this.usersService.findByEmail(email)
        if (userData instanceof User) {
            if (await this.comparePassword(pass, userData.pass)) {
                const payload = { sub: userData.id, email: userData.email }
                return {
                    access_token: await this.jwtService.signAsync(payload),
                }
            } else {
                throw new UnauthorizedException('Invalid credentials!')
            }
        }
    }

    async profile(id: number): Promise<User | any> {
        return await this.usersService.findOne(id)
    }

    async hashPassword(pass: string): Promise<string> {
        const salt = genSaltSync(5)
        return hashSync(pass, salt)
    }

    async comparePassword(
        pass: string,
        hashPassword: string
    ): Promise<boolean> {
        return compareSync(pass, hashPassword)
    }
}
