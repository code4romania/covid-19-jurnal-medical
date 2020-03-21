import { AuthService } from "../auth";

const initialState = {
  user: null
};

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case "user/set": {
      return {
        ...state,
        user: action.payload
      };
    }
    default:
      return state;
  }
};

const thunks = {
  authenticate: () => {
    AuthService.signin();
  },
  setUser: async dispatch => {
    let user = await AuthService.signinCallback();
    dispatch({ type: "user/set", payload: user });
  }
};

export { reducer as UserReducer, thunks as UserThunks };
