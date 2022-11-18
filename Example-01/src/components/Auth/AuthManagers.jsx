import { useCallback, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { auth } from "../../services/firebase";

export default function AuthManagers({ setUser, setMessage, setIsOpenSnackbar }) {
    const initialFormState = { email: '', password: '' };
    const [form, setForm] = useState(initialFormState);

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
            setMessage(`You Authenticate with ${res.email} - ${res.uid}`);
            setIsOpenSnackbar(true);
            setUser(res);
        }
    }

    return (
        <>
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
        </>
    )
}