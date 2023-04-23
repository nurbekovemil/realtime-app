import { ChatsService } from './chats.service';
import { AuthService } from './../auth/auth.service';
import { JoinChatDto, LeaveChatDto } from './dto/join-chat.dto';
import { MessagesService } from './../messages/messages.service';
import { UsersService } from '../users/users.service';
import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from '../messages/dto/message.dto';
import { SocketAuthGuard } from './socket-jwt-auth.guard';

@WebSocketGateway({ cors: true })
@UseGuards(SocketAuthGuard)
export class WSgateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private AuthService: AuthService,
    private UsersService: UsersService,
    private ChatsService: ChatsService,
    private MessagesService: MessagesService,
  ) {}
  @WebSocketServer()
  server: Server;

  // onModuleInit() {
  //   this.server.on('connection', (socket) => {
  //     console.log(`New connection: ${socket.id}`);
  //   });
  // }

  async handleConnection(@ConnectedSocket() client: Socket) {
    const user = await this.AuthService.verifyToken(
      client.handshake.auth.token,
    );
    await this.UsersService.updateUserStatus({
      status: true,
      userId: user.id,
      socketId: client.id,
    });
    this.receiveUserChats(user.id);
  }

  async receiveUserChats(userId) {
    const socketIds = await this.UsersService.getChatUserSocketIds(userId);
    console.log('socketIds: ', socketIds);
    if (socketIds.length > 0) {
      socketIds.map((sid) => {
        console.log('sid: ', sid);
        this.server.to(sid).emit('userChats', sid);
      });
    }
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    const user = await this.AuthService.verifyToken(
      client.handshake.auth.token,
    );
    await this.UsersService.updateUserStatus({
      status: false,
      userId: user.id,
      socketId: null,
    });
    this.receiveUserChats(user.id);
  }
  @SubscribeMessage('sendMessage')
  async onNewMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() NewMessageDto: NewMessageDto,
  ) {
    const message = await this.MessagesService.createMessage({
      ...NewMessageDto,
      userId: client['user'].id,
    });
    this.server.to(`${NewMessageDto.chatId}`).emit('receivedMessage', message);
  }
  @SubscribeMessage('joinChat')
  async onJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() JoinChatDto: JoinChatDto,
  ) {
    const { chatId } = JoinChatDto;
    const chat = `${chatId}`;
    client.join(chat);
  }
  @SubscribeMessage('leaveChat')
  async onLeaveChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() LeaveChatDto: LeaveChatDto,
  ) {
    const { chatId } = LeaveChatDto;
    const chat = `${chatId}`;
    client.leave(chat);
  }
}
