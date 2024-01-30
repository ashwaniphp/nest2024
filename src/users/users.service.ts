import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    public async create(createUserDto: CreateUserDto): Promise<User | object> {
        return this.usersRepository
            .save(createUserDto)
            .then((userData) => {
                return userData
            })
            .catch((e) => {
                throw new HttpException(e.message, HttpStatus.BAD_REQUEST)
            })
    }

    public async findAll(): Promise<User[]> {
        return this.usersRepository.find()
    }

    public async findOne(id: number): Promise<User | any> {
        return this.usersRepository.findOneBy({ id }).then((userData) => {
            if (userData instanceof User) {
                return userData
            } else {
                return new NotFoundException('User not found!')
            }
        })
    }

    public async findByEmail(email: string): Promise<User | any> {
        return this.usersRepository.findOneBy({ email }).then((userData) => {
            if (userData instanceof User) {
                return userData
            } else {
                throw new NotFoundException('User not found')
            }
        })
    }

    public async update(
        id: number,
        userData: UpdateUserDto
    ): Promise<User | any> {
        return await this.findOne(id)
            .then((result) => {
                if (result instanceof User) {
                    this.usersRepository.merge(result, userData)
                    this.usersRepository.update(id, userData)
                    return { id, userData }
                } else {
                    return result
                }
            })
            .catch((e) => {
                throw new HttpException(
                    e.message,
                    HttpStatus.INTERNAL_SERVER_ERROR
                )
            })
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id)
    }
}
