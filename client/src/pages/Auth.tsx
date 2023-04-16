import React, { useState } from 'react';

import { Link, Grid, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Login from '../components/auth/Login';
import Registration from '../components/auth/Registration';

const theme = createTheme();

export default function SignIn() {
  const [authType, setAuthType] = useState(true)
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        {authType ? <Login /> : <Registration />}
        <Grid container>
          <Grid item>
            <Link style={{ cursor: 'pointer' }} onClick={() => setAuthType(!authType)} variant="body2">
              {authType ? "Don't have an account? Sign Up" : "Have an account?"}
            </Link>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}