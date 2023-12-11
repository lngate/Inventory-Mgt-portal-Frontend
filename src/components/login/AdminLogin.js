import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


 function AdminLogin() {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const paperStyle = { padding: '50px', width: 600, margin: '20px auto' };
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
            await axios.post("http://localhost:4567/UserLogin",{
                email:email,
                password: password,
            }).then ((res)=>
            {
            console.log(res.data);
            if(res.data.message === "Email not exist")
            {alert ('Email does not Exist');
        }else if(res.data.message === "Login successful")
        {
            navigate('/home');
        }
        else{
            alert ("Invalid email or password. Please try again.");
        }
    }, fail =>{
        console.error(fail);
    });
}
 catch(err){
    alert(err);
}
}



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
                    <h2 style={{ color: '#39b54a' }}>Admin Login</h2>
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
                        to="/"
                        className="btn btn-default rounded-0 bg-white w-100 text-decoration-none float-end"
                        style={{ color: '#39b54a' }}
                    >
                        {' '}
                        <strong>Back to user Login</strong>
                    </Link>
                </div>
            </Paper>
        </Container>
    );
}

export default AdminLogin;
