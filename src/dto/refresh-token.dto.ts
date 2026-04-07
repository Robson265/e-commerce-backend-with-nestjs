// src/auth/dto/refresh-token.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

// src/auth/dto/auth-tokens.dto.ts
export class AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // seconds
}