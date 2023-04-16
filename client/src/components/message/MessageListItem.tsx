import { FC } from 'react'
import { IMessage } from '../../models/IMessage'

import { Paper, Typography, colors } from '@mui/material';
interface IMessageListItemProps {
  message: IMessage;
  color: string
}

const MessageListItem: FC<IMessageListItemProps> = ({ message, color }) => {
  return (
    <Paper sx={{ p: 1, bgcolor: color, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 400 }}>
      <Typography>{message.content} </Typography>
      <Typography sx={{ fontSize: 12, ml: 1 }} color="text.secondary"> {message.createdAt}</Typography>
    </Paper>

  )
}

export default MessageListItem