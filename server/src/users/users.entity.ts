import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { ChatUser } from 'src/chats/entities/chat-user.entity';
import { Chat } from 'src/chats/entities/chats.entity';
import { Message } from 'src/messages/messages.entity';

interface UserCreateAttrs {
  content: string;
  userId: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  password: number;

  @Column({ type: DataType.STRING, unique: true })
  email: number;

  @BelongsToMany(() => Chat, () => ChatUser)
  chats: ChatUser[];

  @HasMany(() => Message)
  messages: Message[];
}
