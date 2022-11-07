import { List, ListItem, ListItemText } from "@mui/material";

export default function ListData({ data }) {
    return (
        <List>
            { data.map(({ key, val }) => (
                <ListItem>
                    <ListItemText 
                        key={key} 
                        primary={val.name} 
                        secondary={`Age: ${val.age}`} 
                    />
                </ListItem>
            ))}
        </List>
    )
}