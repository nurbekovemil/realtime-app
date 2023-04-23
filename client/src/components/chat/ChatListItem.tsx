import { FC, useEffect, useState } from 'react'
import { Avatar, Badge, Divider, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material/';
import { useLazyGetChatMessagesQuery } from '../../store/services/chat'
import { setCurrentChat } from '../../store/slices/chat'
import { useAppDispatch } from '../../hooks/redux'
import { IChatListItemProps } from '../../models/IChat';
import { IUser } from '../../models/IUser';
import { socket } from '../../socket';

const ChatListItem: FC<IChatListItemProps> = ({ chat, currentChat }) => {
  const dispatch = useAppDispatch()
  const [getChatMessages] = useLazyGetChatMessagesQuery()

  const [lastMessage, setLastMessage] = useState('')
  const [chatName, setChatName] = useState<IUser>()
  useEffect(() => {
    if (chat.messages.length > 0) {
      setLastMessage(chat.messages[0].content)
    }
    if (chat) {
      setChatName(chat.users[0])
    }
  }, [currentChat?.messages, chat])

  const setCurrentChatHandler = () => {
    getChatMessages(chat.id)
    dispatch(setCurrentChat(chat))
    if (currentChat) {
      socket.emit('leaveChat', { chatId: currentChat.id })
    }
    socket.emit('joinChat', { chatId: chat.id })
  }

  return (
    <>
      <ListItem alignItems="flex-start" disablePadding >
        <ListItemButton onClick={setCurrentChatHandler} selected={currentChat?.id === chat.id}>
          <Badge
            color={chatName?.status ? "info" : "default"}
            overlap="circular"
            badgeContent=" "
            variant="dot"

          >
            <Avatar>{chatName?.name[0]}</Avatar>
          </Badge>
          <ListItemText
            sx={{ ml: 1 }}
            primary={chatName?.name}
            secondary={
              <Typography sx={{ fontSize: 12 }} color="text.secondary" noWrap>{lastMessage}</Typography>
            }
          />

        </ListItemButton>
      </ListItem>
      <Divider variant="middle" />
    </>
  )
}

export default ChatListItem