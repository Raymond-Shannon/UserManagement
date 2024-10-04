import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Avatar, Button, Link, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { register } from '../actions/auth';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';


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

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  })

  const changeUser = item => e => {
    setUser({...user, [item]: e.target.value});
  }
  const onClickSignup = e => {
    e.preventDefault();

    if(user.password === user.confirm_password) {
      dispatch(register(user))
        .then(res => {
          navigate("/login");
        })
    }
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
          <h2>Login</h2>
        </Grid>

        <TextField id="standard-basic" label="Full Name" variant="standard" placeholder="Enter Your Full Name" onChange={changeUser("fullname")}
                    fullWidth required />
        <TextField id="standard-basic" label="Email Address" variant="standard" placeholder="Enter Your Email Address" onChange={changeUser("email")}
                   type="email" fullWidth required />
        <TextField id="standard-basic" label="Password" variant="standard" placeholder="Enter Your Password" onChange={changeUser("password")}
                   type="password" fullWidth required />
        <TextField id="standard-basic" label="ConfirmPassword" variant="standard" placeholder="Confirm Your Password" onChange={changeUser("confirm_password")}
                   type="password" fullWidth required />
        <FormControlLabel control={<Checkbox defaultChecked />} label="Remember Me" />

        <Button style={btnstyle} type="submit" color="primary" variant="contained" fullWidth onClick={onClickSignup}>SignUp</Button>

      </Paper>
    </Grid>

  );
};

export default Signup;