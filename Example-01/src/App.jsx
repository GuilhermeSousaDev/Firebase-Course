import { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Stack,
  Paper
} from '@mui/material';
import { AccountCircle, Twitter, Google, Facebook, GitHub } from '@mui/icons-material';
import { auth } from './services/firebase';

function App() {
  const [form, setForm] = useState();

  const changeForm = useCallback(e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }, [form]);

  const createAccount = () => {
    const email = form.email;
    const password = form.password;

    auth.createUser(email, password);
  }

  return (
    <Box align="center" justifyContent="center" direction="column" spacing={2}>
      <h3>Firebase</h3>

      <Paper
        elevation={7}
        sx={{ 
          display:"flex",
          flexDirection:"column",
          alignItems:"center", 
          p: 2, mb: 2, mt: 3, width: '40%' 
        }}
      >
        <TextField 
          name="email" 
          label="Email" 
          variant="standard" 
          onChange={e => changeForm(e)} 
        />
        <TextField 
          name="password" 
          label="Password" 
          variant="standard"
          onChange={e => changeForm(e)} 
        />

        <Box display="flex" flexDirection="column" mb={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Auth
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            onClick={createAccount}
          >
            Create Account
          </Button>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Paper elevation={5}>
            <IconButton color="primary">
              <Twitter />
            </IconButton>
          </Paper>
          <Paper elevation={5}>
            <IconButton color="warning">
              <Google />
            </IconButton>
          </Paper>
          <Paper elevation={5}>
            <IconButton color="primary">
              <GitHub />
            </IconButton>
          </Paper>
          <Paper elevation={5}>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
          </Paper>
          <Paper elevation={5}>
            <IconButton color="primary">
              <AccountCircle />
            </IconButton>
          </Paper>
        </Stack>

        <Button variant="contained" color="inherit">Logout</Button>
      </Paper>
    </Box>
  )
}

export default App
