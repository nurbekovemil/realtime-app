import { MessagesModule } from 'src/messages/messages.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { Chat } from 'src/chats/entities/chats.entity';
import { Message } from 'src/messages/messages.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Chat, Message]),
    JwtModule,
    MessagesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
