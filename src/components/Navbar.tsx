import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useSessionContext } from '../context/session.context';
import { logout } from '../api/auth.api';

const Navbar: React.FC = () => {

  const sessionContext = useSessionContext();
  const navigate = useNavigate();

  return (
    <AppBar position='static'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', width: '100%' }}>
          <Typography variant='h6' sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={() => navigate('/dashboard')}>
            EveryManJacked
          </Typography>
          {sessionContext.isLoggedIn &&
            <Button color='inherit' startIcon={<Logout />} onClick={() => logout()}>
              Log out
            </Button>
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
