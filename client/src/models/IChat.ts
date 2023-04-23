import { IMessage } from "./IMessage";
import { IUser } from "./IUser";

export interface IChat {
  name: string;
  id?: number;
  user_id: number;
  messages: IMessage[];
  users: IUser[];
}

export interface IChatInitialState {
  currentChat: IChat | null;
  chats: IChat[];
}

export interface IChatListItemProps {
  chat: IChat;
  currentChat: IChat | null;
  user: IUser | null;
}

export interface IChatProps {
  drawerWidth: number;
  currentChat: IChat;
}
