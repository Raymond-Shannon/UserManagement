import {
  GET_PERMISSIONS,
} from "../actions/types";

const initialState = []

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PERMISSIONS:
      return [...payload.permissions];

    default:
      return state;
  }
}
