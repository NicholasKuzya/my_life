import { Body, Controller, Param, Post, UnauthorizedException } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";

import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";
import { UserDTO } from "./dto/user.dto";
import { JwtAuthService } from "src/auth/jwt.service";

@Crud({
  routes: { only: ['getManyBase', 'getOneBase'] },
  model: {
    type: User,
  },
  dto: {
    create: UserDTO,
  },
})
@Controller("api/users")
export class UsersController implements CrudController<User> {
  constructor(
    public service: UsersService, private readonly jwtService: JwtAuthService,
  ) { }
  @Post('/signup')
  async signUp(@Body() body: any) {
    console.log(body)
    const user = await this.service.validateUser(body);
    console.log(user)
    // Генерируем JWT токен для нового пользователя
    const token = await this.jwtService.generateToken({ id: user.id });

    return { token };
  }
  @Post('/login')
  async login(@Body() credentials: any) {
    console.log(credentials)
    const user = await this.service.validateUser(credentials);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.generateToken({ id: user.id });
    return { token };
  }
  @Post(':id/balance')
  async updateBalance(@Param('id') id: number, @Body() data: { amount: number }) {
    return this.service.updateBalance(id, data.amount);
  }
}