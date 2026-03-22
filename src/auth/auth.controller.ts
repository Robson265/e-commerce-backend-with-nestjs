import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUser } from 'src/dto/register.user';
import { LoginUser } from 'src/dto/login.user';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)// apply both guards
export class AuthController {

    constructor(
        private authservice: AuthService
    ){}


    @Post("register")
    async register(@Body() registeruser: RegisterUser){
        return await this.authservice.register(registeruser)
    }

    @Post("login")
    async login(@Body() loginuser: LoginUser){
        return await this.authservice.login(loginuser)
    }


}
