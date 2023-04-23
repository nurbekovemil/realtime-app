import { UsersModule } from './../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ChatsService } from './chats.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { Chat } from './entities/chats.entity';
import { MessagesModule } from 'src/messages/messages.module';
import { WSgateway } from './chats.gateway';
import { User } from 'src/users/users.entity';
import { ChatUser } from './entities/chat-user.entity';
import { Message } from 'src/messages/messages.entity';
import { AuthModule } from 'src/auth/auth.module';
// import { WSgateway } from './chats.gateway';

@Module({
  imports: [
    AuthModule,
    MessagesModule,
    UsersModule,
    JwtModule,
    SequelizeModule.forFeature([Chat, ChatUser, User, Message]),
  ],
  controllers: [ChatsController],
  providers: [ChatsService, WSgateway],
  exports: [ChatsService],
})
export class ChatsModule {}
