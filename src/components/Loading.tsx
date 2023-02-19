import React from 'react';
import { Box, Container, LinearProgress } from '@mui/material';

const Loading: React.FC = () => {
  return (
    <Container maxWidth='md'>
      <Box sx={{ my: 5 }}>
        <LinearProgress />
      </Box>
    </Container>
  );
}

export default Loading;
