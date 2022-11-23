import { UploadFile } from "@mui/icons-material";
import { IconButton, Box, Input } from "@mui/material";
import { useCallback, useState } from "react";

export default function Storage() {
    const initialFormState = { file: '' };
    const [form, setForm] = useState(initialFormState);

    const changeForm = useCallback(e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }, [form]);

    return (
        <Box 
            sx={{ width: 200 }} 
            mt={5} 
            display="flex" 
            flexDirection="column"
            alignItems="center"
        >
            <Input
                sx={{ display: 'none' }}
                type="file"
                value={form.file}
                name="file"
                label="File"
                variant="standard"
                onChange={e => changeForm(e)}
            />

            <Box 
                display="flex" 
                flexDirection="column" 
                mb={2} 
                sx={{ border: '1px solid black', width: '70vh', height: '70vh' }}
            >
                <IconButton>
                    <UploadFile />
                    Upload
                </IconButton>
            </Box>
        </Box>
    )
}