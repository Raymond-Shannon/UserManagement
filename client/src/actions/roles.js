import axios from "axios";
import { GET_ROLES } from './types';

const API_URL = "http://localhost:8081/api/roles/";

export const getAllRoles = () => dispatch => {
  return axios
    .get(API_URL)
    .then(response => {
      dispatch({
        type: GET_ROLES,
        payload: response.data,
      })
    })
}