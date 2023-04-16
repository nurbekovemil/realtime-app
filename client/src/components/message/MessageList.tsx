import { FC, useEffect, useRef, Fragment } from 'react';
import { Grid, List } from '@mui/material/';
import { useAppSelector } from '../../hooks/redux';
import { IMessage } from '../../models/IMessage';
import MessageListItem from './MessageListItem';

interface IMessageListProps {
  messages: IMessage[] | null
}
const MessageList: FC<IMessageListProps> = ({ messages }) => {
  const { user } = useAppSelector(state => state.auth)
  const lastMessageRef = useRef<null | HTMLDivElement>(null)
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages])
  return (
    <Grid container spacing={0.5} direction="column">
      {
        messages && messages.map((msg, i) => (
          <Grid
            ref={i == messages.length - 1 ? lastMessageRef : null}
            item
            xs="auto"
            container
            key={msg.id}
            justifyContent={user && user.id == msg.userId ? 'flex-end' : 'flex-start'}
          >
            <MessageListItem message={msg} color={user && user.id == msg.userId ? '#fffde7' : 'white'} />
          </Grid>
        ))
      }
    </Grid>

  );
}

export default MessageList