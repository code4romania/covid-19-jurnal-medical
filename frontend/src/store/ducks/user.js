import { createAction, createReducer } from "redux-act";
import { createSelector } from "reselect";

export const ac = {
  setUser: createAction("set loggedin user")
};

const stateSel = state => state.user;
const userSel = createSelector(stateSel, s => s.user);

export const sel = {
  state: stateSel,
  user: userSel
};

export default createReducer(
  {
    [ac.setUser]: (state, payload) => ({
      ...state,
      user: payload
    })
  },
  {}
);
