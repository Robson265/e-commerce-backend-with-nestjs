import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class TokenService{
    constructor(
        private jwt: JwtService
    ){}

    generateAccessToken(userId: string){
        return this.jwt.signAsync(
            {sub: userId },
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: (process.env.JWT_ACCESS_EXPIRATION ?? '15m') as any
            }
        );

    }

    generateRefreshToken(userId: string, device_id: string){
        return this.jwt.signAsync(
            {sub: userId, device_id},
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: process.env.JWT_REFRESH_EXPIRATION as any
            }
        );
    }


}