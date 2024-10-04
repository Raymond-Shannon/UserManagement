import {
  GET_ROLES
} from "../actions/types";

const initialState = []

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ROLES:
      return [...payload.roles];

    default:
      return state;
  }
}
