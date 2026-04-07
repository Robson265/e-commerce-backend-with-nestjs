import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}


    async create(userData: {
            userName: string;
            password: string;
            email: string;
            phoneNumber: string;
            role: string;
    }){
        const newUser = this.userRepository.create({
            userName: userData.userName,
            password: userData.password,
            email: userData.email,
            phoneNumber: userData.phoneNumber
        })
        return this.userRepository.save(newUser)
    }


    async findUser(email: string){
        return await this.userRepository.findOne({
            where: {email}
        })
    }

        async save(user: User){
        return this.userRepository.save(user)
    }
}
