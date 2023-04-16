import { FC } from 'react';
import { List } from '@mui/material/';
import ChatListItem from './ChatListItem';
import { useAppSelector } from '../../hooks/redux';

interface IChatListProps {
  drawerWidth: number
}
const ChatList: FC<IChatListProps> = () => {
  const { chats, currentChat } = useAppSelector(state => state.chat)
  const { user } = useAppSelector(state => state.auth)
  return (
    <List component="nav" aria-labelledby="nested-list-subheader" sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', pt: 0 }}>
      {
        chats.map(chat => <ChatListItem chat={chat} currentChat={currentChat} key={chat.id} user={user} />)
      }
    </List>
  );
}

export default ChatList