import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './messages.entity';
import { User } from 'src/users/users.entity';

@Module({
  imports: [SequelizeModule.forFeature([Message, User])],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
