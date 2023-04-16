import { FC } from 'react'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material/';
import { IUserSearchItemProps } from '../../models/IUser';
import { useCreateChatMutation } from '../../store/services/chat'

const UserSearchItem: FC<IUserSearchItemProps> = ({ user }) => {
  const [createChat, result] = useCreateChatMutation()
  const createChatHandler = () => {
    createChat({ user_id: user.id })
  }
  return (
    <ListItem alignItems="flex-start" disablePadding>
      <ListItemButton onClick={createChatHandler}>
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText primary={user.name} secondary={''} />
      </ListItemButton>
    </ListItem>
  )
}

export default UserSearchItem