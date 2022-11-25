import { useState, useEffect } from "react";
import { IconButton, Paper } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useDropzone } from 'react-dropzone';

export default function Storage() {
    const [file, setFile] = useState();
    const [color, setColor] = useState('primary');

    const { getRootProps } = useDropzone({
        onDrop: files => {
            setFile(Object.assign(files[0], { preview: URL.createObjectURL(files[0]) }))
        },
        onDragEnter: () => setColor('secondary'),
        onDragOver: () => setColor('primary'),
        onDropAccepted: () => setColor('success'),
        onDropRejected: () => setColor('error'),
    });

    useEffect(() => {
        console.log(file);
    }, [file]);

    return (
        <Paper 
            {...getRootProps()}
            elevation={7}
            sx={{ 
                display:"flex", 
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center", 
                width: '70vh', height: '70vh', mt: 5, cursor: 'pointer',
            }}
        >
            <IconButton>
                <UploadFile 
                    fontSize="large"  
                    color={color}
                />
            </IconButton>
        </Paper>
    )
}