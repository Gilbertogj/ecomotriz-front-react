import { createSelector } from "reselect";

const selectInblock = (state) => state.inblock;

export const selectInblockCurrentUser = createSelector(
  [selectInblock],
  (inblock) => inblock.currentUser
);

export const selectInblockCurrentUserAccessToken = createSelector(
  [selectInblock],
  (inblock) => (inblock.currentUser ? inblock.currentUser.access : null)
);

export const selectInblockCurrentUserRefreshToken = createSelector(
  [selectInblock],
  (inblock) => (inblock.currentUser ? inblock.currentUser.refresh : null)
);

export const selectInblockUserRole = createSelector(
  [selectInblock],
  (inblock) => inblock.role
);
