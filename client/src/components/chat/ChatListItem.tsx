import { FC, useEffect, useState } from 'react'
import { Avatar, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material/';
import { IChatListItemProps } from '../../models/IChat';
import { setCurrentChat } from '../../store/slices/chat'
import { useAppDispatch } from '../../hooks/redux'
import { useLazyGetChatMessagesQuery } from '../../store/services/chat'
import { socket } from '../../socket';
import { deepOrange, deepPurple } from '@mui/material/colors';

const ChatListItem: FC<IChatListItemProps> = ({ chat, currentChat, user }) => {
  const dispatch = useAppDispatch()
  const [getChatMessages, result] = useLazyGetChatMessagesQuery()

  const [lastMessage, setLastMessage] = useState('')
  const [chatName, setChatName] = useState('')
  useEffect(() => {
    if (chat.messages.length > 0) {
      setLastMessage(chat.messages[0].content)
    }
    if (chat) {
      setChatName(chat.users.filter(item => user && item.id != user.id)[0].name)
    }
  }, [currentChat?.messages])

  const setCurrentChatHandler = () => {
    getChatMessages(chat.id)
    dispatch(setCurrentChat(chat))
    socket.emit('joinChat', { chatId: chat.id })
  }

  return (
    <ListItem alignItems="flex-start" disablePadding >
      <ListItemButton onClick={setCurrentChatHandler} selected={currentChat?.id === chat.id}>
        <Avatar sx={{ mr: 1 }}>{chatName[0]}</Avatar>
        <ListItemText
          primary={chatName}
          secondary={
            <Typography sx={{ fontSize: 12 }} color="text.secondary" noWrap>{lastMessage}</Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  )
}

export default ChatListItem