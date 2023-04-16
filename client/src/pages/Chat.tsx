import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ChatList from '../components/chat/ChatList';
import { useAppSelector } from '../hooks/redux'
import UserSearch from '../components/user/UserSearch';
import ChatForm from '../components/chat/ChatForm';
import { useGetUserChatsQuery } from '../store/services/chat'
import { socket } from '../socket';
import MessageList from '../components/message/MessageList';
import { Avatar } from '@mui/material';

const drawerWidth = 300;

const Chat = () => {
  const { currentChat } = useAppSelector(state => state.chat)
  const { isAuthenticated, user } = useAppSelector(state => state.auth)
  const [chatName, setChatName] = useState('')
  const { isFetching, isLoading, data } = useGetUserChatsQuery('')

  useEffect(() => {
    if (isAuthenticated) {
      socket.connect()
    }
    if (currentChat) {
      setChatName(currentChat.users.filter(item => user && item.id != user.id)[0].name)
    }
  }, [isAuthenticated, currentChat])
  return (
    <Box sx={{ display: 'flex' }}>
      {
        currentChat && <AppBar
          elevation={0}
          position="fixed"
          color='inherit'
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
          <Toolbar>
            <Avatar sx={{ mr: 1 }}>{chatName[0]}</Avatar>
            <Typography variant="h6" noWrap component="div" >
              {chatName}
            </Typography>
          </Toolbar>
          <Divider />
        </AppBar>
      }


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
      <Box
        component="main"

        sx={{
          flexGrow: 1,
          p: 3,
          py: 10,
        }}
      >

        {currentChat && <MessageList messages={currentChat?.messages} />}
      </Box>

      {currentChat && <ChatForm drawerWidth={drawerWidth} />}
    </Box>
  );
}

export default Chat