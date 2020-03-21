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
    case "user/clear": {
      return {
        ...state,
        user: null
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
  },
  logout: () => {
    AuthService.signout();
  },
  clearUser: async dispatch => {
    await AuthService.signoutCallback();
    dispatch({ type: "user/clear" });
  },
  silentRefresh: async dispatch => {
    await AuthService.silentRefresh();
  }
};

export { reducer as UserReducer, thunks as UserThunks };
