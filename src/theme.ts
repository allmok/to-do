import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#6b7b94', 
      paper: '#a8b5cc',
    },
    text: {
      primary: '#343a40',
      secondary: '#495057',
    },
    divider: '#6b7b94', 
  },
  typography: {
    fontFamily: 'system-ui, sans-serif',
    h5: {
        fontWeight: 600,
    }
  },
});

export default theme;