import { useState, useEffect } from "react";
import { IconButton, Box } from "@mui/material";
import { UploadFile, FileUpload } from "@mui/icons-material";
import { useDropzone } from 'react-dropzone';

export default function Storage() {
    const [file, setFile] = useState();

    const { getRootProps } = useDropzone({
        onDrop: files => {
            setFile(Object.assign(files[0], { preview: URL.createObjectURL(files[0]) }))
        },
    });

    useEffect(() => {
        console.log(file);
    }, [file]);

    return (
        <Box 
            {...getRootProps()}
            display="flex" 
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ width: 200, border: '1px solid black', width: '70vh', height: '70vh', mt: 5 }}
        >
            <IconButton size="medium">
                <FileUpload />
            </IconButton>
        </Box>
    )
}