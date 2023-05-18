import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyboardBackspace } from '@mui/icons-material';
import { Box, Button, Container, FormControl, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FeedbackType, useFeedbackContext } from '../../context/feedback.context';
import { Exercise, ExerciseCategory, initialExerciseData, NewExercise } from '../../models/exercise.model';
import { createExercise, parseExercise } from './exercise.service';
import { useExerciseContext } from '../../context/exercise.context';

const ExerciseFormCreate: React.FC = () => {

    const exerciseContext = useExerciseContext();
    const feedbackContext = useFeedbackContext();
    const navigate = useNavigate();

    const handleSetExercise = (newExercise: Exercise) => {
        const updatedExercises = [...exerciseContext.exercises];
        updatedExercises.push(newExercise);
        exerciseContext.setExercises(updatedExercises);
    };

    const handleCreateExercise = (exercise: NewExercise) => {
        createExercise(exercise).then((response) => {
            const exerciseData = parseExercise(response.data);
            handleSetExercise(exerciseData);
            feedbackContext.setFeedback({
                message: 'Exercise Created!',
                type: FeedbackType.SUCCESS,
                open: true,
            });
            navigate(`/exercises/${exerciseData._id}`);
        }).catch((error: any) => {
            if (typeof error === 'object') {
                feedbackContext.setFeedback({
                    message: error.response.data ?? error.message, 
                    type: FeedbackType.ERROR,
                    open: true,
                });
            } else {
                feedbackContext.setFeedback({
                    message: error, 
                    type: FeedbackType.ERROR,
                    open: true,
                });
            }
        });
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        categories: Yup.array(
            Yup.mixed<ExerciseCategory>().oneOf(
                Object.values(ExerciseCategory)
            ).required()
        ).min(1).required(),
    });

    const formik = useFormik({
        initialValues: initialExerciseData,
        validationSchema,
        onSubmit: (values: NewExercise) => handleCreateExercise(values),
    });

    return (
        <Container maxWidth='md'>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', my: 5, position: 'relative' }}>
                <Button
                    startIcon={<KeyboardBackspace />}
                    onClick={() => navigate('/dashboard')}
                    sx={{ position: { xs: 'relative', sm: 'absolute'}, left: { xs: null, sm: 0 } }}
                >
                    Back to dashboard
                </Button>
                <Typography component='h6' variant='h6' sx={{ fontWeight: 600 }}>
                    Create Exercise
                </Typography>
            </Box>
            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                <FormControl fullWidth>
                    <Box component='form' onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    error={formik.touched.title && Boolean(formik.errors.title)}
                                    helperText={formik.touched.title && formik.errors.title}
                                    name='title'
                                    label='Title'
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    fullWidth
                                    value={formik.values.categories}
                                    onChange={formik.handleChange}
                                    SelectProps={{
                                        multiple: true,
                                        value: formik.values.categories,
                                    }}
                                    error={formik.touched.categories && Boolean(formik.errors.categories)}
                                    helperText={formik.touched.categories && formik.errors.categories}
                                    name='categories'
                                    label='Categories'
                                >
                                    <MenuItem key={ExerciseCategory.CHEST} value={ExerciseCategory.CHEST}>Chest</MenuItem>
                                    <MenuItem key={ExerciseCategory.BACK} value={ExerciseCategory.BACK}>Back</MenuItem>
                                    <MenuItem key={ExerciseCategory.ARMS} value={ExerciseCategory.ARMS}>Arms</MenuItem>
                                    <MenuItem key={ExerciseCategory.SHOULDERS} value={ExerciseCategory.SHOULDERS}>Shoulders</MenuItem>
                                    <MenuItem key={ExerciseCategory.LEGS} value={ExerciseCategory.LEGS}>Legs</MenuItem>
                                    <MenuItem key={ExerciseCategory.PUSH} value={ExerciseCategory.PUSH}>Push</MenuItem>
                                    <MenuItem key={ExerciseCategory.PULL} value={ExerciseCategory.PULL}>Pull</MenuItem>
                                    <MenuItem key={ExerciseCategory.UPPER} value={ExerciseCategory.UPPER}>Upper</MenuItem>
                                    <MenuItem key={ExerciseCategory.LOWER} value={ExerciseCategory.LOWER}>Lower</MenuItem>
                                    <MenuItem key={ExerciseCategory.HIIT} value={ExerciseCategory.HIIT}>HIIT</MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>

                        <Button variant='contained' type='submit' sx={{ my: 2 }}>
                            Save
                        </Button>
                    </Box>
                </FormControl>
            </Box>
        </Container>
    );
}

export default ExerciseFormCreate;
