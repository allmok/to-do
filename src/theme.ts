import { createTheme } from '@mui/material/styles';

const pastelTheme = createTheme({
  palette: {
    primary: {
      main: '#a2d2ff',
    },
    secondary: {
      main: '#ffafcc',
    },
    background: {
      default: '#fdf7f6',
      paper: '#ffffff',
    },
    text: {
        primary: '#555555',
        secondary: '#777777',
    }
  },
  typography: {
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
    ].join(','),
  }
});

export default pastelTheme;