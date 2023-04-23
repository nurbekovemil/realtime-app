import { Chat } from './../chats/entities/chats.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.entity';
import { Op } from 'sequelize';
import { Message } from 'src/messages/messages.entity';
import { UpdateUserStatusDto } from './dto/update-user.dto';
import sequelize from 'sequelize';
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
              through: {
                attributes: [],
              }, // Exclude join table attributes
              where: {
                id: {
                  [Op.ne]: userId,
                },
              },
              attributes: {
                include: [
                  [
                    sequelize.fn(
                      'to_char',
                      sequelize.col('chats.users.updatedAt'),
                      'YYYY-MM-DD HH24:MI',
                    ),
                    'updatedAt',
                  ],
                ],
                exclude: ['createdAt', 'password', 'email'],
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
        exclude: ['createdAt', 'password', 'email'],
      },
    });
    console.log('------ ', JSON.stringify(user.chats), ' ------- ');
    return user.chats;
  }

  async getChatUserSocketIds(userId: number) {
    const user = await this.UserEntity.findByPk(userId, {
      include: [
        {
          model: this.ChatEntity,
          include: [
            {
              model: this.UserEntity,

              where: {
                id: {
                  [Op.ne]: userId,
                },
                socketId: {
                  [Op.ne]: null,
                },
              },
              attributes: {
                exclude: [
                  'password',
                  'createdAt',
                  'updatedAt',
                  'email',
                  'ChatUser',
                ],
              },
            },
          ],
          attributes: {
            exclude: ['updatedAt', 'createdAt'],
          },
        },
      ],
    });
    const socketIds = await user.chats.map((chat) => chat.users[0].socketId);
    return socketIds;
  }

  async updateUserStatus({ userId, status, socketId }: UpdateUserStatusDto) {
    const user = await this.UserEntity.findByPk(userId);
    if (!user) {
      throw new HttpException(
        { message: 'Error in updating user' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await user.update({ status, socketId });
  }
}
