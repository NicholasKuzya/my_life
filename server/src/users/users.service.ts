import { Body, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import * as bcrypt from 'bcrypt';

import { User } from "./entities/user.entity";

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }
  async validateUser(@Body() body: any) {
    const { email, password } = body;
    let user = await this.repo.findOneBy({email})
    if(!user) {
      const {firstName, lastName, username} = body;
      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10);

      // Создаем нового пользователя
      user = await this.repo.create({ email, password: hashedPassword, firstName, lastName, username });

      // Сохраняем пользователя в базе данных
      user = await this.repo.save(user);
    } else {

      const isValidPassword = await bcrypt.compare(password, user.password);
      if(!isValidPassword) {
        throw new BadRequestException('Неверный логин или пароль');
      }
    }
    return user;
  }
  async updateBalance(userId: number, amount: number): Promise<User> {
    const user = await this.repo.findOneBy({id: userId});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.balance += amount;
    return this.repo.save(user);
  }
}