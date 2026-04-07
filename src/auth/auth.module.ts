import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global:true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {expiresIn: '60'},
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
