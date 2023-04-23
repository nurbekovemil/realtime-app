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
import { User } from '../../users/users.entity';
import { Chat } from './chats.entity';

@Table({ tableName: 'chat_users', timestamps: false })
export class ChatUser extends Model<ChatUser> {
  users(users: any): any {
    throw new Error('Method not implemented.');
  }
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER })
  chatId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User[];

  @BelongsTo(() => Chat)
  chat: Chat;
}
