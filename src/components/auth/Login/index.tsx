import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined } from '@mui/icons-material';
import { Avatar, Card, Container, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login, setTokenStorage } from '../../../api/auth.api';
import { FeedbackType, useFeedbackContext } from '../../../context/feedback.context';
import { useSessionContext } from '../../../context/session.context';
import { initialLoginData, LoginData } from '../../../models/auth.model';
import Loading from '../../Loading';
import LoginForm from './LoginForm';

const Login: React.FC = () => {

    const sessionContext = useSessionContext();
    const feedbackContext = useFeedbackContext();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = (loginData: LoginData) => {
        setLoading(true);
        login(loginData).then((response) => {
            setLoading(false);
            setTokenStorage(response.data);
            sessionContext.setSession(true, response.data.user);
            navigate('/dashboard');
        }).catch((error: any) => {
            if (typeof error === 'object') {
                setLoading(false);
                feedbackContext.setFeedback({
                    message: error.response.data ?? error.message, 
                    type: FeedbackType.ERROR,
                    open: true,
                });
            } else {
                setLoading(false);
                feedbackContext.setFeedback({
                    message: error, 
                    type: FeedbackType.ERROR,
                    open: true,
                });
            }
        });
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues: initialLoginData,
        validationSchema,
        onSubmit: (values: LoginData) => handleLogin(values),
    });

    useEffect(() => {
        if (sessionContext.isLoggedIn) {
            navigate('/dashboard');
        };
    }, []);

    return (
        <>
            { loading ? <Loading /> :
                <Container component='main' maxWidth='xs'>
                    <Card sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', mt: 8, px: 2, py: 4 }}>
                        <Avatar sx={{ m: 1 }}>
                            <LockOutlined />
                        </Avatar>
                        <Typography component='h5' variant='h5' fontWeight={600}>
                            Admin Login
                        </Typography>
                        <Container component='main' maxWidth='sm'>
                            <LoginForm formik={formik} />
                        </Container>
                    </Card>
                </Container>
            }
        </>
    );
}

export default Login;
