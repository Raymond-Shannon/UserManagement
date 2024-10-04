import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
} from "../actions/types";

const initialState = []

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return [...payload.users];

    case ADD_USER:
        return [...state, payload.user];

    default:
      return state;
  }
}
