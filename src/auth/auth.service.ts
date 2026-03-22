import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ChangePassword} from 'src/dto/changePassword'
import {ForgetPassword} from 'src/dto/forgetPassword'
import { RegisterUser } from 'src/dto/register.user';
import { LoginUser } from 'src/dto/login.user';
import { access } from 'fs';
import { Role } from './common/enums/role.enum';
import { CreateOrder } from 'src/dto/createOrder';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UsersService
    ){}


    //register user
    async register(registeruser: RegisterUser){
        const existingUser = await this.userService.findUser(registeruser.email)

        if(existingUser){
            throw new BadRequestException("User Already Exist")
        }

        const salt = await bcrypt.gensalt(12)
        const hash = await bcrypt.hash(registeruser.password, salt)

        const userName: string = `${registeruser.firstName} ${registeruser.lastName}`;

        return await this.userService.create({
            userName,
            password: hash,
            email: registeruser.email,
            phoneNumber: registeruser.phoneNumber,
            role: registeruser.role ?? Role.CUSTOMER,
        })
    }   


    //user login
    async login(loginuser: LoginUser){
        const user = await this.userService.findUser(loginuser.email)

        if(!user){
            throw new BadRequestException("User Not Found")
        }

        const isPasswordValid = await bcrypt.compare(loginuser.password, user.password)

        if(!isPasswordValid){
            throw new BadRequestException("Invalid Password")
        }

        const payload = {sub: user.id, username: user.userName, role: user.role};
    

        return {
            access_token: await this.jwtService.signAsync(payload)
                }

    }

    //change Password
    async changePassword(changepassword: ChangePassword){

        const user = await this.userService.findUser(changepassword.email)

        if(!user){
            throw new BadRequestException("User Not Found")
        }


        const isPasswordValid = await bcrypt.compare(changepassword.currentPassword, user.password)

        if(!isPasswordValid){
            throw new BadRequestException("Invalid Password")
        }

        const isSamePassword = await bcrypt.compare(changepassword.newPassword, user.password)

        if(isSamePassword){
            throw new BadRequestException("Try another Password")
        }

        const salt = await bcrypt.gensalt(12)
        const hash = await bcrypt.hash(changepassword.newPassword, salt)


        user.password = hash;
        await this.userService.save(user);

        return {message:" Password changed successfully"};
    }



    //FORGET PASSWORD
    async forgetPassword(forgetpassword: ForgetPassword){
        const user = await this.userService.findUser(forgetpassword.email)

        if(!user){
            throw new BadRequestException("User not Found")
        }


        const isMatch = await bcrypt.compare(forgetpassword.newPassword, forgetpassword.confirmPassword)

        if(!isMatch){
            throw new BadRequestException("Password do not match")
        }

        const salt = await bcrypt.salt(12)
        const hash = await bcrypt.hash(forgetpassword.newPassword, salt)


        user.password = hash;
        await this.userService.save(user);

        return {message:" Password changed successfully"};
    }

    //create Order
    // async createOrder(createorder: CreateOrder){

    // }
}
