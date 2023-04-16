import { NewMessageDto } from './dto/message.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './messages.entity';
import { User } from 'src/users/users.entity';
import sequelize from 'sequelize';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private MessageEntity: typeof Message,
    @InjectModel(User) private UserEntity: typeof User,
  ) {}

  async createMessage({ chatId, userId, content }: NewMessageDto) {
    const createdMessage = await this.MessageEntity.create({
      chatId,
      userId,
      content,
    });
    const message = await this.MessageEntity.findByPk(createdMessage.id, {
      attributes: [
        'id',
        'content',
        'chatId',
        'userId',
        [
          sequelize.fn('to_char', sequelize.col('createdAt'), 'HH24:MI'),
          'createdAt',
        ],
      ],
    });
    return message;
  }
  async getChatMessages(chatId: number) {
    const messages = await this.MessageEntity.findAll({
      where: {
        chatId,
      },
      attributes: [
        'id',
        'content',
        'chatId',
        'userId',
        [
          sequelize.fn('to_char', sequelize.col('createdAt'), 'HH24:MI'),
          'createdAt',
        ],
      ],
    });
    return { chatId, messages };
  }
}
