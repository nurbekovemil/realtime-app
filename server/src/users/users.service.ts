import { Chat } from './../chats/entities/chats.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.entity';
import { Op } from 'sequelize';
import { Message } from 'src/messages/messages.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private UserEntity: typeof User,
    @InjectModel(Chat) private ChatEntity: typeof Chat,
    @InjectModel(Message) private MessageEntity: typeof Message,
  ) {}
  async createUser(CreateUserDto: CreateUserDto) {
    return await this.UserEntity.create({
      ...CreateUserDto,
    });
  }
  async getUserByEmail(email: string) {
    return await this.UserEntity.findOne({
      where: { email },
    });
  }
  async findUserByPk(id: number) {
    return await this.UserEntity.findByPk(id);
  }
  async searchUserByName(name: string, userId: number) {
    const users = await this.UserEntity.findAll({
      where: {
        name: {
          [Op.substring]: name,
        },
        id: {
          [Op.ne]: userId,
        },
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    });
    return users;
  }
  async getUserChats(userId: number) {
    const user = await this.UserEntity.findByPk(userId, {
      include: [
        {
          model: this.ChatEntity,
          include: [
            {
              model: this.UserEntity,
              through: { attributes: [] }, // Exclude join table attributes
              attributes: {
                exclude: ['updatedAt', 'createdAt', 'password', 'email'],
              },
            },
            {
              model: this.MessageEntity,
              order: [['createdAt', 'DESC']],
              limit: 1,
            },
          ],
          attributes: {
            exclude: ['updatedAt', 'createdAt'],
          },
        },
      ],
      attributes: {
        exclude: ['updatedAt', 'createdAt', 'password', 'email'],
      },
    });
    return user.chats;
  }
}
