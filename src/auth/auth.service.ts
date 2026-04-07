import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {ChangePassword} from 'src/dto/changePassword'
import {ForgetPassword} from 'src/dto/forgetPassword'
import { RegisterUser } from 'src/dto/register.user';
import { LoginUser } from 'src/dto/login.user';
import { Role } from './common/enums/role.enum';
import { Repository } from 'typeorm';
import { RefreshToken } from 'src/entities/refresh-token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenDto } from 'src/dto/refresh-token.dto';
import { TokenService } from './token.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private tokenService: TokenService,
        @InjectRepository(RefreshToken)
        private refreshTokenRepo: Repository<RefreshToken>,

    ){}


    //register user
    async register(registeruser: RegisterUser){
        const existingUser = await this.userService.findUser(registeruser.email)

        if(existingUser){
            throw new BadRequestException("User Already Exist")
        }

        // const salt = await bcrypt.gensalt(12)
        const hash = await bcrypt.hash(registeruser.password, 12);

        const userName: string = `${registeruser.firstName.trim()} ${registeruser.lastName.trim()}`;

        const user =  await this.userService.create({
            userName,
            password: hash,
            email: registeruser.email,
            phoneNumber: registeruser.phoneNumber,
            role: registeruser.role ?? Role.CUSTOMER,
        });

        const access_token = this.tokenService.generateAccessToken(user.id);

        const device_id = crypto.randomUUID();

        const refresh_tokens = this.tokenService.generateRefreshToken(
            user.id,
            device_id,
        );

        const expiry = new Date(Date.now() * 30 * 24 * 60 * 60 * 1000);

        const salt = await bcrypt.gensalt(12);
        const token_hash = await bcrypt.hash(refresh_tokens, salt); 

        await this.refreshTokenRepo.save({
        token_hash,
        device_id,
        expiry,
        user,
    });

    return { refresh_tokens, device_id, access_token };

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



}
