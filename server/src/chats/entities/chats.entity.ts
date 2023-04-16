import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Message } from 'src/messages/messages.entity';
import { User } from '../../users/users.entity';
import { ChatUser } from './chat-user.entity';

interface ChatCreateAttrs {
  title: string;
  last_message_id?: number;
  type_id: number;
}

@Table({ tableName: 'chats' })
export class Chat extends Model<Chat, ChatCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @BelongsToMany(() => User, () => ChatUser)
  users: User[];

  @HasMany(() => Message)
  messages: Message[];
}
