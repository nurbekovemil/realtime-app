import { FC, useState } from 'react'
import { Box, Avatar, Typography, TextField, Button } from '@mui/material';
import { useLoginMutation } from '../../store/services/auth'

const Login: FC = () => {
  const [login, { isLoading }] = useLoginMutation()
  const [email, setEmail] = useState('emil@mail.ru')
  const [password, setPassword] = useState('emil')

  const loginHandler = () => {
    login({ email, password })
  }
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          size="small"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          size="small"
          onChange={(e) => setPassword(e.target.value)}

        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={loginHandler}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  )
}

export default Login