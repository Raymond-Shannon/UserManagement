import axios from "axios";
import { GET_USERS } from './types';

const API_URL = "http://localhost:8081/api/auth/";

export const getAllUsers = () => dispatch => {
  return axios
    .get(API_URL + "users")
    .then(response => {
      dispatch({
        type: GET_USERS,
        payload: response.data,
      })
    })
}