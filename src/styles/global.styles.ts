import createTheme from '@mui/material/styles/createTheme';

export const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003566',
    },
    secondary: {
      main: '#ffc300',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});
