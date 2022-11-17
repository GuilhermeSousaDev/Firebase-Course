import { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Stack,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import { AccountCircle, Twitter, Google, Facebook, GitHub, Close } from '@mui/icons-material';
import { auth } from './services/firebase';

function App() {
  const initialFormState = { email: '', password: '' };
  const [form, setForm] = useState(initialFormState);
  const [user, setUser] = useState();
  const [message, setMessage] = useState('');
  const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

  const changeForm = useCallback(e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }, [form]);

  const createAccount = async () => {
    const email = form.email;
    const password = form.password;

    if (email && password) {
      await auth.createUser(email, password);
      setForm(initialFormState);
      setMessage('User Create');
      setIsOpenSnackbar(true);
    }
  }

  const signUser = async () => {
    const email = form.email;
    const password = form.password;

    if (email && password) {
      const res = await auth.signUser(email, password);
      
      setForm(initialFormState);
      setMessage(`You Authenticate with ${res.email}`);
      setIsOpenSnackbar(true);
      setUser(res);
    }
  }

  const signoutUser = async () => {
    await auth.signoutUser();
    setMessage('You Logout with Success');
    setIsOpenSnackbar(true);
    setUser('');
  }

  return (
    <Box align="center" justifyContent="center" direction="column" spacing={2}>
      <h3>Firebase { user ? `Bem Vindo - ${user.email}` : '' } </h3>

      <Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isOpenSnackbar}
        autoHideDuration={2500}
        onClose={_ => setIsOpenSnackbar(false)}
      >
        <Alert 
          severity='success' 
          onClose={_ => setIsOpenSnackbar(false)}
        >
          { message }
        </Alert>
      </Snackbar>

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
          value={form.email}
          name="email" 
          label="Email" 
          variant="standard" 
          onChange={e => changeForm(e)} 
        />
        <TextField 
          value={form.password}
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
            onClick={signUser}
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

        <Button 
          variant="contained" 
          color="inherit"
          onClick={signoutUser}
        >
          Logout
          </Button>
      </Paper>
    </Box>
  )
}

export default App
