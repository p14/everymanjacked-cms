import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

interface LoginFormProps {
    formik: any
}

const LoginForm = ({ formik }: LoginFormProps) => {
    return (
        <FormControl fullWidth>
            <Box component='form' onSubmit={formik.handleSubmit} sx={{ marginTop: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant='standard'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            name='username'
                            label='Username' />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            variant='standard'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            name='password'
                            label='Password'
                            type='password' />
                    </Grid>
                </Grid>

                <Button fullWidth type='submit' variant='contained' color='primary' sx={{ mt: 5 , mb: 4 }}>
                    Log In
                </Button>
            </Box>
        </FormControl>
    );
};

export default LoginForm;
