import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../components/login.component';
import Signup from '../components/signup.component';
import Dashboard from '../components/dashboard.component';
import UserManagement from '../components/UserManagement.component';
import Settings from '../components/Settings.component';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS } from '../actions/types';
import RoleManagement from '../components/RoleManagement.component';
import ProfileComponent from '../components/Profile.component';


export default props => {

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('user');

  useEffect(() => {
    if (token) {
      const user = JSON.parse(token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {user: user.user}
      });

      navigator("/profile");
    }
  }, [])


  return (
    <div>
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/usermanagement" element={<UserManagement />} />
          <Route exact path="/rolemanagement" element={<RoleManagement />} />
          <Route exact path="/settings" element={<Settings />} />
          <Route exact path="/profile" element={<ProfileComponent />} />

        </Routes>


    </div>

  );
}