import * as actionTypes from "./actions";

const initialState = {
  authToken: null,
  userId: null,
  firstName: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        authToken: action.authToken
      };
    case actionTypes.REMOVE_TOKEN:
      return {
        ...state,
        authToken: null
      };
    default:
      return state;
  }
};

export default reducer;
