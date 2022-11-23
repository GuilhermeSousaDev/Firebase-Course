import { Box } from '@mui/material';
import Auth from "./pages/Auth";
import Storage from "./pages/Storage";

function App() {

  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Auth /> 
      <Storage />
    </Box>
  )
}

export default App;