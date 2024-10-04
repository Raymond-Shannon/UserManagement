import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../actions/users';
import Appbar from './Appbar.component';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



function UserManagementComponent(props) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [])

  return (
    <div>
      <Appbar />

      <div className="table-container" style={{margin: "20px"}}>
        <Paper sx={{ height: 400, width: '100%' }}>
          <h2 style={{marginTop: "20px", textAlign: "center"}}>User Table</h2>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>User Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Permissions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row, i) => (
                <TableRow
                  key={i}
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.user_name}
                  </TableCell>
                  <TableCell>{row.user_email}</TableCell>
                  <TableCell>{row.role_name}</TableCell>
                  <TableCell>
                    {row.permissions.map(item => (<p>{item.name} Page</p>))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
}

export default UserManagementComponent;