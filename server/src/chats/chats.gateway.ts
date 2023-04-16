import { JoinChatDto } from './dto/join-chat.dto';
import { MessagesService } from './../messages/messages.service';
import { ChatsService } from './chats.service';
import { OnModuleInit, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from '../messages/dto/message.dto';
import { SocketAuthGuard } from './socket-jwt-auth.guard';

@WebSocketGateway({ cors: true })
@UseGuards(SocketAuthGuard)
export class WSgateway implements OnModuleInit {
  constructor(
    private ChatsService: ChatsService,
    private MessagesService: MessagesService,
  ) {}
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`New connection: ${socket.id}`);
    });
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
    console.log(`User joined to chat ${chat}`);
    // client.to(chat).emit('sendMessage', {
    //   message: `User ${user_id} joined to chat ${chat}`,
    // });
  }
}
