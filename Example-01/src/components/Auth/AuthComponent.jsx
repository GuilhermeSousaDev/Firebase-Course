import { useState } from 'react';
import {
    Box,
    Paper,
    Snackbar,
    Alert,
    Typography,
    Avatar,
} from '@mui/material';
import AuthTypesButtons from './AuthTypesButtons';
import AuthManagers from './AuthManagers';

function AuthComponent() {
    const [user, setUser] = useState();
    const [message, setMessage] = useState('');
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false);

    return (
        <Box align="center" justifyContent="center" direction="column" spacing={2}>
            <Typography variant="h5">Firebase</Typography>

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
                    {message}
                </Alert>
            </Snackbar>

            { user ? 
                (
                    <>
                        <Typography>
                            { 
                            user.displayName ? 
                                user.displayName : user.email ? 
                                    user.email : 'Anonymous' 
                            }
                        </Typography>
                        <Avatar src={user.photoURL ? user.photoURL : ''} >
                            { user.isAnonymous && 'AN' }
                        </Avatar>
                        <Typography>{ user.uid }</Typography>
                    </>
                )
                : '' 
            }

            <Paper
                elevation={7}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2, mb: 2, mt: 3, width: '40%'
                }}
            >
                

                <AuthManagers
                    setUser={setUser}
                    setMessage={setMessage}
                    setIsOpenSnackbar={setIsOpenSnackbar}
                />

                <AuthTypesButtons
                    setUser={setUser}
                    setMessage={setMessage}
                    setIsOpenSnackbar={setIsOpenSnackbar}
                />
            </Paper>
        </Box>
    )
}

export default AuthComponent;
