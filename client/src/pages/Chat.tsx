import { useEffect } from 'react';
import { Box, Drawer } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useLazyGetUserChatsQuery } from '../store/services/chat'
import { addLastMessageChatList, addMessageCurrentChat, setCurrentChat } from '../store/slices/chat';
import ChatList from '../components/chat/ChatList';
import UserSearch from '../components/user/UserSearch';
import ChatForm from '../components/chat/ChatForm';
import MessageList from '../components/message/MessageList';
import ChatHeader from '../components/chat/ChatHeader';
import { socket } from '../socket';

const drawerWidth = 300;

const Chat = () => {
  const { currentChat } = useAppSelector(state => state.chat)
  const { isAuthenticated } = useAppSelector(state => state.auth)

  const [getUserChats] = useLazyGetUserChatsQuery()
  const dispatch = useAppDispatch()
  useEffect(() => {

    if (isAuthenticated) {
      getUserChats('')
      socket.auth = {
        token: localStorage.getItem('token') || '',
      }
      socket.connect()
      socket.on("userChats", (data) => {
        getUserChats('')
      })
      socket.on("receivedMessage", (data) => {
        dispatch(addMessageCurrentChat(data));
        dispatch(addLastMessageChatList(data))

      });
      socket.on('connect_error', (err) => {
        console.log(err)
      })
    }
  }, [isAuthenticated])

  return (
    <Box sx={{ display: 'flex' }}>
      {currentChat && <ChatHeader currentChat={currentChat} drawerWidth={drawerWidth} />}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
          backgroundColor: 'red'
        }}
        variant="permanent"
        anchor="left"
      >
        <UserSearch />
        <ChatList drawerWidth={drawerWidth} />
      </Drawer>
      {currentChat &&
        <>
          <Box component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              py: 10,
            }}
          >
            <MessageList messages={currentChat?.messages} />
          </Box>
          <ChatForm drawerWidth={drawerWidth} currentChat={currentChat} />
        </>
      }
    </Box>
  );
}

export default Chat