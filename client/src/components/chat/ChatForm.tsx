import { FC, useState } from 'react'
import { AppBar, Toolbar, IconButton, FormControl, InputAdornment, InputBase } from '@mui/material/';
import SendIcon from '@mui/icons-material/Send';
import { socket } from '../../socket';
import { IChatProps } from '../../models/IChat';


const ChatForm: FC<IChatProps> = ({ drawerWidth, currentChat }) => {
  const [messageText, setMessageText] = useState('')
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
    <AppBar
      position="fixed"
      color="inherit"
      sx={{
        minHeight: 64,
        top: 'auto',
        bottom: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`
      }}>
      <Toolbar>
        <FormControl
          sx={{
            width: '100%'
          }}
          size='small'
          variant="outlined"
          focused={false}
        >
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