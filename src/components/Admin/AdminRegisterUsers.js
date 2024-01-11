import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useRef,useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';



const roles = [
  {
    value: 'Admin',
    label: 'Admin',
  },
  {
    value: 'Partner',
    label: 'Partner',
  },
  {
    value: 'Safaricom staff',
    label: 'Safaricom staff',
  }
];


const textFieldStyle = { marginBottom: '20px' };

function AdminRegisterUsers() {

const userRef = useRef();
const errRef = useRef();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const paperStyle = { padding: '50px', width: 900, margin: '100px auto' };
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  
  

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage('');
  }, [email]); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      
      await axios.post("http://localhost:4567/UserRegistration", {
        email: email,
      }).then((res) => {
        console.log(res.data);
        if (res.data.message === "Email exist") {
        
        } else if (res.data.message === "Registration successful")
         {
            navigate('/home');
        } else {
            setErrorMessage ("User email already Used!");
        }
      }, fail => {
        console.error(fail);
      });

    } catch (error) {
        setErrorMessage(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <Container spacing={2}>
        <Paper elevation={10} style={paperStyle}>
          <div className="login_copy-header">
            <h2 className="font-weight--medium mt-20">Welcome Admin</h2>
            <h1 className="lg font-weight--medium">
              <span className="font-weight--xbold">Register User to </span> SIP
            </h1>
          </div>
          <p style={{  color: 'red' }} ref={errRef} className={errorMessage ? 'errorMessage' : 'offscreen'} aria-live="assertive">
                        {errorMessage} 
                    </p>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            style={textFieldStyle}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            style={textFieldStyle}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            style={textFieldStyle}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Company"
            variant="outlined"
            fullWidth
            value={company}
            style={textFieldStyle}
            onChange={(e) => setCompany(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={phoneNumber}
            style={textFieldStyle}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            id="outlined-select-roles"
            select
            label="Roles"
            defaultValue="Safaricom staff"
            helperText="Please select Role"
            fullWidth
            value={roles}
            style={textFieldStyle}
          >
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              type="submit"
              style={{ backgroundColor: '#39b54a', color: 'white' }}
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

export default AdminRegisterUsers;
