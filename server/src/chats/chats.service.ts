import { User } from './../users/users.entity';
import { MessagesService } from './../messages/messages.service';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './entities/chats.entity';
import { Op } from 'sequelize';
import { Message } from 'src/messages/messages.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectModel(Chat) private ChatEntity: typeof Chat,
    @InjectModel(User) private UserEntity: typeof User,
    @InjectModel(Message) private MessageEntity: typeof Message,
    private UsersService: UsersService,
    private MessagesService: MessagesService,
  ) {}
  async createNewChat(otherUserId: number, userId: number) {
    // Find the current user and the other user by ID
    const [user, otherUser] = await Promise.all([
      this.UsersService.findUserByPk(userId),
      this.UsersService.findUserByPk(otherUserId),
    ]);
    const isExistingChat = await user.$get('chats', {
      include: [
        {
          model: this.UserEntity,
          where: { id: otherUserId },
          through: { attributes: [] }, // Exclude join table attributes
          attributes: {
            exclude: ['updatedAt', 'createdAt', 'password'],
          },
        },
      ],
    });
    if (isExistingChat.length > 0) {
      return isExistingChat[0];
    }
    // Create a new chat
    const createdChat = await this.ChatEntity.create();
    // Add the users to the chat
    await user.$add('chat', createdChat),
      await otherUser.$add('chat', createdChat);
    // Return chat with users and messages -- users[], messages[]
    const chat = await this.ChatEntity.findByPk(createdChat.id, {
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
        },
      ],
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
    });
    return chat;
  }
  async getUserChats(userId: number) {
    // Return user chats
    return this.UsersService.getUserChats(userId);
  }
  async getChatMessages(chatId: number) {
    // Return chat messages
    return this.MessagesService.getChatMessages(chatId);
  }
}
