// auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
console.log("SECRET: " + process.env.SECRET_KEY_JWT)
@Module({
  imports: [
    forwardRef(() => UsersModule), // Используем forwardRef
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY_JWT,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  providers: [JwtAuthService, JwtStrategy],
  exports: [JwtAuthService],
})
export class AuthModule {}
