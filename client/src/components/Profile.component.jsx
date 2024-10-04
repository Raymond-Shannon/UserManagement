import React, { useEffect, useState } from 'react';
import Appbar from './Appbar.component';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, Button, Link, Select, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuItem from '@mui/material/MenuItem';
import { getAllRoles } from '../actions/roles';


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
const btnstyle = { backgroundColor: '#1B6DA1', margin: '30px 0' };

const textfieldStyle = {margin: "20px 0px"};


function ProfileComponent(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.user);
  const roles = useSelector((state) => state.roles);

  const [user, setUser] = useState({
    name: auth.user_name,
    email: auth.user_email,
    role: auth.role_name
  });

  useEffect(() => {
    dispatch(getAllRoles());
  }, []);

  const onClickSaveBtn = e => {
    e.preventDefault();


  }

  const changeUser = item => e => {
    setUser({...user, [item]: e.target.value});
  }

  return (
    <div>
      <Appbar />

      <Grid>

        <Paper elavation={12} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}><AssignmentIndIcon style={{ color: '#002A57' }} /></Avatar>

            <h2>Account</h2>
          </Grid>

          <TextField id="standard-basic" label="FullName" variant="standard" placeholder="Enter Your Full Name" fullWidth onChange={changeUser("name")}
                    defaultValue={user.name}  required style={textfieldStyle}></TextField>
          <TextField id="standard-basic" label="Email" variant="standard" placeholder="Enter Your Password" onChange={changeUser("password")}
                    defaultValue={user.email} type="email" fullWidth required  style={textfieldStyle}></TextField>

          <p>Role</p>
          <Select
            fullWidth
            defaultValue={user.role}
            label="Role"
            onChange={changeUser("role")}
            variant="outlined"
          >
            {roles.map((item, i) => (
              <MenuItem key={i} value={item.name}>{item.name}</MenuItem>
            ))}
          </Select>


          <Button style={btnstyle} type="submit" color="primary" variant="contained" fullWidth
                  onClick={onClickSaveBtn}>Save</Button>

        </Paper>
      </Grid>
    </div>
  );
}

export default ProfileComponent;
