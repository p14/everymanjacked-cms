import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import Dashboard from './components/Dashboard';
import ExerciseEditor from './components/exercise/ExerciseEditor';
import ExerciseFormCreate from './components/exercise/ExerciseFormCreate';
import FeedbackAlert from './components/FeedbackAlert';
import LoginForm from './components/auth/LoginForm';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import { ExerciseProvider } from './context/exercise.context';
import { FeedbackProvider } from './context/feedback.context';
import { SessionProvider } from './context/session.context';

const App: React.FC = () => {
  return (
    <Router>
      <SessionProvider>
        <ExerciseProvider>
          <FeedbackProvider>
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path='/' element={<LoginForm />} />

              {/* Private Routes */}
              <Route element={<RequireAuth />}>
                <Route path='/dashboard' element={<Dashboard />} />
                {/* <Route path='/exercises' element={<ExerciseDashboard />} /> */}
                <Route path='/exercises/new' element={<ExerciseFormCreate />} />
                <Route path='/exercises/:id' element={<ExerciseEditor />} />
                <Route path='*' element={<PageNotFound />} />
              </Route>
            </Routes>
            <FeedbackAlert />
          </FeedbackProvider>
        </ExerciseProvider>
      </SessionProvider>
    </Router>
  );
}

export default App;
