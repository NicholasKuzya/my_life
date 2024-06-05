import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { UsersService } from '../users/users.service';

@WebSocketGateway({ cors: true })
export class BalanceGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly usersService: UsersService) {}

  @SubscribeMessage('updateBalance')
  async handleUpdateBalance(@MessageBody() data: { userId: number, amount: number }): Promise<void> {
    const { userId, amount } = data;
    const user = await this.usersService.updateBalance(userId, amount);
    this.server.emit('balanceUpdated', { userId, newBalance: user.balance });
  }
}
