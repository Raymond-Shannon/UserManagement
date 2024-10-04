import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
} from "./types";

import AuthService from "../services/auth.service";

export const register = (user) => (dispatch) => {
  return AuthService.register(user.fullname, user.email, user.password).then(
    (response) => {
      if(response.message == "Signup Successful!") {

        dispatch({
          type: REGISTER_SUCCESS,
        });

        return Promise.resolve();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.user },
      });

      return Promise.resolve();
    },
    (error) => {
      dispatch({
        type: LOGIN_FAIL,
      });


      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const googleLogin = (code) => dispatch => {
  return AuthService.google_login(code).then(
    data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data.user },
      });
      return Promise.resolve();
    }
  )
    .catch(err => {

      dispatch({
        type: LOGIN_FAIL,
      });


      return Promise.reject();
    })
}
