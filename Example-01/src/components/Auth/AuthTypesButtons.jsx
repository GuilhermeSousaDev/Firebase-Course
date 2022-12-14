import { AccountCircle, Facebook, GitHub, Google, Twitter } from "@mui/icons-material";
import { Button, IconButton, Paper, Stack } from "@mui/material";
import { auth } from "../../services/firebase";

export default function AuthTypesButtons({ setUser, setMessage, setIsOpenSnackbar }) {
    const changeStates = (messageState, userState) => {
        setMessage(messageState);
        setIsOpenSnackbar(true);
        setUser(userState);
    }

    const anonymousSign = async () => {
        const anonymousUser = await auth.anonymousSign();

        changeStates('AnonymousLogin', anonymousUser);
    }

    const signoutUser = async () => {
        await auth.signoutUser();
        
        changeStates('You Logout with Success', '');
    }

    const githubSign = async () => {
        const user = await auth.githubSign();

        changeStates(`You Sign with ${user.displayName}`, user);
    }

    const googleSign = async () => {
        const user = await auth.googleSign();

        changeStates(`You Sign with ${user.displayName}`, user);
    }

    const facebookSign = async () => {
        const user = await auth.facebookSign();

        changeStates(`You Sign with ${user.displayName}`, user);
    }

    const twitterSign = async () => {
        const user = await auth.twitterSign();

        changeStates(`You Sign with ${user.displayName}`, user);
    }

    return (
        <>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Paper elevation={5} onClick={twitterSign}>
                    <IconButton color="primary">
                    <Twitter />
                    </IconButton>
                </Paper>
                <Paper elevation={5} onClick={googleSign}>
                    <IconButton color="warning">
                    <Google />
                    </IconButton>
                </Paper>
                <Paper elevation={5} onClick={githubSign}>
                    <IconButton color="primary">
                    <GitHub />
                    </IconButton>
                </Paper>
                <Paper elevation={5} onClick={facebookSign}>
                    <IconButton color="inherit">
                    <Facebook />
                    </IconButton>
                </Paper>
                <Paper elevation={5} onClick={anonymousSign}>
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
      </>
    )
}