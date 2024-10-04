import React, { useEffect } from 'react';
import Appbar from './Appbar.component';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPermissions } from '../actions/permissions';
import { getAllRoles } from '../actions/roles';

function RoleManagement(props) {
  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles);
  const permissions = useSelector((state) => state.permissions);

  useEffect(() => {
    dispatch(getAllRoles());
    dispatch(getAllPermissions());
  }, []);

  return (
    <div>
      <Appbar />

      <div className="table-container" style={{ margin: "20px" }}>
        <Paper sx={{ height: 400, width: '40%' }}>
          <h3 style={{textAlign: "center", marginTop: "10px"}}>Role Table</h3>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Role Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.map((row, i) => (
                <TableRow
                  key={i}
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Paper sx={{ height: 400, width: '40%' }}>
          <h3 style={{ textAlign: "center", marginTop: "10px" }}>Permission Table</h3>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Permission Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {permissions.map((row, i) => (
                <TableRow
                  key={i}
                >
                  <TableCell>{i + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
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

export default RoleManagement;