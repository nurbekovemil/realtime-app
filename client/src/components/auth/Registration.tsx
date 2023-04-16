import { FC, useState } from 'react'
import { Box, Avatar, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { green } from '@mui/material/colors';
import { useRegistrationMutation } from '../../store/services/auth'
import { useNavigate } from 'react-router-dom';
const Registration: FC = () => {
  const [registration, { isLoading }] = useRegistrationMutation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const registrationHandler = async () => {
    try {
      await registration({ name, email, password })
    } catch (error) {
      console.log(error)
    }

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
        Sign up
      </Typography>
      <Box>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="User name"
          name="name"
          autoComplete="name"
          autoFocus
          size="small"
          onChange={(e) => setName(e.target.value)}
        />
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
          disabled={isLoading}
          onClick={registrationHandler}
        >
          {isLoading ? <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          /> : 'Sign up'}
        </Button>
      </Box>
    </Box>
  )
}

export default Registration