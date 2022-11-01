import { useCallback, useState } from 'react';
import {
  Box,
  TextField,
  Button,
} from '@mui/material';
import { getDatabase, set, ref } from 'firebase/database';
import db from './services/firebase';

function App() {
  const [data, setData] = useState();

  const changeDataForm = useCallback(e => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }, [data]);

  const createUser = useCallback(() => {
    db.create('users', { name: data.name, age: data.age })
      .then(res => console.log(res))
      .catch(e => console.log(e));
  }, [data]);

  return (
    <Box align="center" justifyContent="center" direction="column" spacing={2}>
      <h3>Firebase</h3>

      <Box
        display="flex"
        flexDirection="column"
        sx={{ p: 2, mb: 2, mt: 4, width: '30%', border: '1px solid black', borderRadius: 5 }}
      >
        <TextField name="name" label="Name" variant="standard" onChange={e => changeDataForm(e)} />
        <TextField type="number" name="age" label="Age" variant="standard" onChange={e => changeDataForm(e)} />

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4 }}
          onClick={createUser}
        >
          Add User
        </Button>
      </Box>
    </Box>
  )
}

export default App
