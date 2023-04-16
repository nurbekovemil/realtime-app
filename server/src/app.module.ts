import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MessagesController } from './messages/messages.controller';
import { MessagesModule } from './messages/messages.module';
import { ChatsService } from './chats/chats.service';
import { ChatsModule } from './chats/chats.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.entity';
import { Chat } from './chats/entities/chats.entity';
import { Message } from './messages/messages.entity';
import { ChatUser } from './chats/entities/chat-user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [User, Chat, ChatUser, Message],
      autoLoadModels: true,
    }),
    UsersModule,
    MessagesModule,
    ChatsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
