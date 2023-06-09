import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class SocketAuthGuard implements CanActivate {
  constructor(private JwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient();
    const token = client.handshake.auth.token;
    try {
      if (!token) {
        return false;
      }
      const user = await this.JwtService.verify(token.toString(), {
        secret: process.env.PRIVATE_JWT_KEY,
      });
      client['user'] = user;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
