import { FC } from 'react'
import { IMessageListItemProps } from '../../models/IMessage'

import { Paper, Typography } from '@mui/material';



const MessageListItem: FC<IMessageListItemProps> = ({ message, color }) => {
  return (
    <Paper sx={{ p: 1, bgcolor: color, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 400 }}>
      <Typography>{message.content} </Typography>
      <Typography sx={{ fontSize: 12, ml: 1 }} color="text.secondary"> {message.createdAt}</Typography>
    </Paper>

  )
}

export default MessageListItem