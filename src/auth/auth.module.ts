import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constant';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global:true,
      secret: jwtConstant.secret,
      signOptions: {expiresIn: '60'},
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
