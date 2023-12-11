import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const paperStyle = { padding: '50px', width: 600, margin: '20px auto' };
    const user = { email, password };
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/UserLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    withCredentials: true,
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('app_token', data.body.token);
                localStorage.setItem('username', data.body.first_name);
                navigate('/home');
            } else {
                const errorMessage = await response.text();
                handleErrorResponse(response.status, errorMessage);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred while processing your request.');
        }
    };

    const handleErrorResponse = (status, errorMessage) => {
        switch (status) {
            case 404:
                setErrorMessage('User does not exist');
                break;
            case 500:
                setErrorMessage('Internal server error');
                break;
            case 401:
                setErrorMessage('Email or Password does not match');
                break;
            default:
                setErrorMessage('Other errors');
                errRef.current.focus();
        }
    };

    return (
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <div className="login_logo-header">
                    <img src="/public/apple-touch-icon.png" alt="Logo" className="logo" />
                </div>
                <div className="login_copy-header">
                    <h2 className="font-weight--medium mt-20">Welcome to </h2>
                    <h1 className="lg font-weight--medium">
                        <span className="font-weight--xbold">SIP </span> Manager
                    </h1>
                    <p className="sm">inventory portal for equipment, materials, and decommissioning.</p>
                </div>
                <div>
                    <p style={{  color: 'red' }} ref={errRef} className={errorMessage ? 'errorMessage' : 'offscreen'} aria-live="assertive">
                        {errorMessage} 
                    </p>
                    <h2 style={{ color: '#39b54a' }}>User Login</h2>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            ref={userRef}
                            required
                        />
                        <TextField
                            id="outlined-basic"
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Stack spacing={2} direction="row">
                            <Button
                                variant="contained"
                                type="submit"
                                style={{ backgroundColor: '#39b54a', color: 'white' }}
                            >
                                Sign In
                            </Button>
                        </Stack>
                    </Box>
                    <br />
                    <br />
                    <p>
                        {' '}
                        Forgot Password?
                        <Link
                            to=" "
                            className="btn btn-default rounded-0 bg-white w-100 text-decoration-none float-end"
                            style={{ color: '#39b54a' }}
                        >
                            {' '}
                            Reset Password
                        </Link>
                    </p>
                    <br />
                    <br />
                    <Link
                        to="/AdminLogin"
                        className="btn btn-default rounded-0 bg-white w-100 text-decoration-none float-end"
                        style={{ color: '#39b54a' }}
                    >
                        {' '}
                        <strong>Admin Login</strong>
                    </Link>
                </div>
            </Paper>
        </Container>
    );
}

export default Login;
