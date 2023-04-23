import { AppBar, Avatar, Divider, Grid, Toolbar, Typography } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import { IUser } from '../../models/IUser'
import { IChatProps } from '../../models/IChat'
import moment from 'moment'



const ChatHeader: FC<IChatProps> = ({ currentChat, drawerWidth }) => {
  const [chatName, setChatName] = useState<IUser>()
  const [lastSeen, setLastSeen] = useState('')
  useEffect(() => {
    if (currentChat) {
      setChatName(currentChat.users[0])
      setLastSeen(moment(chatName?.updatedAt).fromNow())
    }
  }, [currentChat])
  return (
    <AppBar
      elevation={0}
      position="fixed"
      color='inherit'
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Avatar sx={{ mr: 1 }}>{chatName?.name[0]}</Avatar>
        <Grid container flexDirection={'column'}>
          <Grid item >
            <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
              {
                chatName?.name
              }
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: 12, color: chatName?.status ? '#0288d1' : 'grey' }} >
              {
                chatName?.status ? 'online' : lastSeen
              }
            </Typography>

          </Grid>
        </Grid>
      </Toolbar>
      <Divider />
    </AppBar>
  )
}

export default ChatHeader