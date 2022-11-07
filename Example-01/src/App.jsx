import { useCallback, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Stack,
  CircularProgress,
} from '@mui/material';
import db from './services/firebase';
import { AccountCircle } from '@mui/icons-material';
import ListData from './components/ListData';


function App() {
  const [form, setForm] = useState();
  const [data, setData] = useState([]);

  const loadUsers = useCallback(() => {
    const snapshot = db.find('users');

    setData(snapshot);
  }, [data]);

  const changeForm = useCallback(e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }, [form]);

  const createUser = useCallback(() => {
    if (form?.age && form?.name) {
      db.create('users', form);
    }
  }, [form]);

  return (
    <Box align="center" justifyContent="center" direction="column" spacing={2}>
      <h3>Firebase</h3>

      <Box
        display="flex"
        flexDirection="column"
        sx={{ p: 2, mb: 2, mt: 4, width: '30%', border: '1px solid black', borderRadius: 5 }}
      >
        <TextField 
          name="name" 
          label="Name" 
          variant="standard" 
          InputProps={{ 
            startAdornment:(
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            )
          }}
          onChange={e => changeForm(e)} 
        />
        <TextField 
          type="number" 
          name="age" 
          label="Age" 
          variant="standard"
          onChange={e => changeForm(e)} 
        />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={createUser}
        >
          Add User
        </Button>
      </Box>

      <Button variant="contained" color="primary" onClick={loadUsers}>List Users</Button>

      <Stack alignItems='center' spacing={2}>
        { data? <ListData data={data} /> : <CircularProgress /> }
      </Stack>
    </Box>
  )
}

export default App
