import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SUCCESS } from '../actions/types';
import { googleLogin, login } from '../actions/auth';
import { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import ReactLoginMS from 'react-ms-login';
import AuthService from '../services/auth.service';
import axios from 'axios';


const paperStyle = {
  padding: 20,
  height: '70vh',
  width: 280,
  margin: '19px auto',
  backgroundColor: '#E6F4F1',
  borderRadius: '12px',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 25)',
};
const avatarStyle = { backgroundColor: '#D9D9D9' };
const btnstyle = { backgroundColor: '#1B6DA1', margin: '12px 0' };
const logoStyle = { backgroundColor: '#D9D9D9', margin: '10px 0', width: 70, height: 70 };


const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const auth = useSelector((state) => state.auth);

  const onClickLoginBtn = e => {
    e.preventDefault();

    // navigate("/dashboard");
    dispatch(login(user.email, user.password))
      .then(res => {})
      .catch(err => {

      })
  };

  const changeUser = item => e => {
    setUser({...user, [item]: e.target.value});
  }

  useEffect(() => {
    if(auth.isLoggedIn)
      navigate("/profile");
  }, [auth.isLoggedIn]);

  const handleGoogleLoginSuccess = (response) => {
    const credential = response.credential;

    dispatch(googleLogin(credential))
      .then(res => {})
      .catch(err => {

      })
  }

  return (

    <Grid>
      <Grid align="center">
        <Avatar style={logoStyle}><LocationCityIcon style={{ color: '#002A57', width: 56, height: 56 }} /></Avatar>
        <h2>User Management System</h2>
      </Grid>


      <Paper elavation={12} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}><LockOutlinedIcon style={{ color: '#002A57' }} /></Avatar>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
          />

          <h2>Login</h2>
        </Grid>
        <TextField id="standard-basic" label="Email" variant="standard" placeholder="Enter Your Email Address" fullWidth onChange={changeUser("email")}
                   type="email" required/>
        <TextField id="standard-basic" label="Password" variant="standard" placeholder="Enter Your Password" onChange={changeUser("password")}
                   type="password" fullWidth required />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

        <Button style={btnstyle} type="submit" color="primary" variant="contained" fullWidth
                onClick={onClickLoginBtn}>Login</Button>


        <Typography>Don't have an account?
          <Link href="/signup">
            Sign Up Here.
          </Link>
        </Typography>
      </Paper>
    </Grid>

  );
};

export default Login;