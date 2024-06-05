// users.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthModule } from '../auth/auth.module'; // Импортируем AuthModule
import { BalanceGateway } from 'src/websockets/balance.gateway';

@Module({
  controllers: [UsersController],
  providers: [UsersService, BalanceGateway],
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule), // Используем forwardRef
  ],
})
export class UsersModule {}
