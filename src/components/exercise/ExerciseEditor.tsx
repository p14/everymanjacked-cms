import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useExerciseContext } from '../../context/exercise.context';
import { FeedbackType, useFeedbackContext } from '../../context/feedback.context';
import { Exercise, initialExerciseRender } from '../../models/exercise.model';
import ExerciseForm from './ExerciseForm';
import Loading from '../Loading';

const ExerciseEditor: React.FC = () => {

  const { id } = useParams();
  const exerciseContext = useExerciseContext();
  const feedbackContext = useFeedbackContext();

  const navigate = useNavigate();

  const [exercise, setExercise] = useState<Exercise>(initialExerciseRender);
  const [loading, setLoading] = useState<Boolean>(true);

  const handleSetExercise = (updatedExercise: Exercise) => {
    const index = exerciseContext.exercises.findIndex((exercise) => exercise._id === id);
    const updatedExercises = [...exerciseContext.exercises];
    updatedExercises[index] = updatedExercise;
    exerciseContext.setExercises(updatedExercises);
    setExercise(updatedExercise);
  };

  useEffect(() => {
    if (id && exerciseContext.exercises.length) {
      const exerciseData = exerciseContext.exercises.find((exercise) => exercise._id === id);
      if (exerciseData) {
        setExercise(exerciseData);
        setLoading(false);
      } else {
        feedbackContext.setFeedback({
          message: 'Exercise Not Found', 
          type: FeedbackType.ERROR,
          open: true,
        });
        setLoading(false);
        navigate('/exercises');
      }
    }
  }, [exerciseContext, feedbackContext, id, navigate]);

  return (
    <>
      { loading && <Loading /> }
      { id && !loading &&
        <ExerciseForm id={id} exercise={exercise} handleSetExercise={handleSetExercise} />
      }
    </>
  );
}

export default ExerciseEditor;
