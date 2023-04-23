export interface IMessage {
  id: number;
  content: string;
  userId: number;
  chatId: number;
  createdAt: string;
}

export interface IMessageListItemProps {
  message: IMessage;
  color: string;
}
