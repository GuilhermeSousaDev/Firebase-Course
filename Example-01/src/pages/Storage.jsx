import { useState } from "react";
import { 
    IconButton, 
    Paper, 
    Card, 
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import { useDropzone } from 'react-dropzone';
import { storage } from "../services/firebase";

export default function Storage() {
    const [file, setFile] = useState();
    const [progress, setProgress] = useState(0);
    const [color, setColor] = useState('primary');

    const { getRootProps } = useDropzone({
        onDrop: files => {
            setFile(Object.assign(files[0], { preview: URL.createObjectURL(files[0]) }))
        },
        onDragEnter: () => setColor('secondary'),
        onDragOver: () => setColor('secondary'),
        onDragLeave: () => setColor('primary'),
        onDropAccepted: () => setColor('success'),
        onDropRejected: () => setColor('error'),
    });

    const submitFile = () => {
        storage.uploadFile(file)
            .on('state_changed', ({ bytesTransferred, totalBytes }) => {
                setProgress((bytesTransferred / totalBytes) * 100)
            });
        
        setFile('');
    }

    return (
        <Paper 
            elevation={7}
            sx={{ 
                display:"flex", 
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"center", 
                width: '70vh', height: '70vh', mt: 5,
            }}
        >
            <IconButton {...getRootProps()}>
                <UploadFile 
                    fontSize={ color === 'secondary'? 'large' : 'medium' }
                    color={color}
                />
            </IconButton>

            { progress > 0 ? 
                <CircularProgress variant="determinate" value={progress} /> 
                : '' 
            }

            { file ? 
                (
                    <Card>
                        <CardMedia 
                            component="img"
                            height="240"
                            image={file.preview}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                { file.name }
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Size: { file.size }
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                Type: { file.type.split('/')[1] }
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button 
                                variant="contained" 
                                color="success"
                                onClick={submitFile}
                            >
                                Submit
                            </Button>
                        </CardActions>
                    </Card>
                ) 
                : '' 
            }
        </Paper>
    )
}