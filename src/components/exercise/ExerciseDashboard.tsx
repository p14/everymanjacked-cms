import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import ExerciseDataTable from './ExerciseDataTable';

const ExerciseDashboard: React.FC = () => {

  const navigate = useNavigate();

  return (
    <Box sx={{ mt: 5 }}>
      <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography component='h6' variant='h6' sx={{ fontWeight: 600 }}>
          Exercises
        </Typography>
        <Button variant='contained' onClick={() => navigate('/exercises/new')}>
          New Exercise
        </Button>
      </Box>
      <ExerciseDataTable />
    </Box>
  );
}

export default ExerciseDashboard;
