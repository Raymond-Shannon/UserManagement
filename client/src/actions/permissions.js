import axios from "axios";
import { GET_PERMISSIONS } from './types';

const API_URL = "http://localhost:8081/api/permissions/";

export const getAllPermissions = () => dispatch => {
  return axios
    .get(API_URL)
    .then(response => {
      dispatch({
        type: GET_PERMISSIONS,
        payload: response.data,
      })
    })
}