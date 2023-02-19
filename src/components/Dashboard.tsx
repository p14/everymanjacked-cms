import React from 'react';
import { Container } from '@mui/material';
import ExerciseDashboard from './exercise/ExerciseDashboard';

const Dashboard: React.FC = () => {
  return (
    <Container component='main' maxWidth='lg'>
      <ExerciseDashboard />
    </Container>
  );
}

export default Dashboard;
