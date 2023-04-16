import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Chat } from 'src/chats/entities/chats.entity';
import { User } from '../users/users.entity';

interface MessageCreateAttrs {
  content: string;
  userId: number;
  chatId: number;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreateAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  content: string;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER })
  chatId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => Chat)
  chat: Chat;

  @BelongsTo(() => User)
  user: User;
}
