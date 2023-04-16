import { FC, useEffect, useState } from 'react'
import { AppBar, Toolbar, IconButton, FormControl, OutlinedInput, InputAdornment, InputBase } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { } from '../../store/services/chat'
import { socket } from '../../socket';
import { addLastMessageChatList, addMessageCurrentChat } from '../../store/slices/chat';

interface IChatFormProps {
  drawerWidth: number;
}
const ChatForm: FC<IChatFormProps> = ({ drawerWidth }) => {

  const dispatch = useAppDispatch()

  const [messageText, setMessageText] = useState('')
  const { currentChat } = useAppSelector(state => state.chat)

  useEffect(() => {
    socket.on("receivedMessage", (data) => {
      dispatch(addMessageCurrentChat(data));
      dispatch(addLastMessageChatList(data))
    });
  }, [])

  const sendMessage = () => {
    if (messageText.trim() != '') {
      socket.emit('sendMessage', { content: messageText, chatId: currentChat?.id })
    }
    setMessageText('')
  }

  const sendHandler = () => {
    sendMessage()
  }
  const enterHandler = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }
  return (
    <AppBar position="fixed" color="inherit" sx={{ minHeight: 64, top: 'auto', bottom: 0, width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
      <Toolbar>
        <FormControl sx={{ width: '100%' }} size='small' variant="outlined" focused={false}>
          <InputBase
            placeholder='Write a message...'
            onKeyPress={enterHandler}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={sendHandler}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </Toolbar>
    </AppBar>
  )
}

export default ChatForm