import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const selectUserToken = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.token : null)
);

export const selectUserRole = createSelector([selectUser], (user) => user.role);
