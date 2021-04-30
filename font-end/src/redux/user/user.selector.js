import { createSelector } from 'reselect';

export const selectUser= (state) => state.user;
export const selectCurrentUser = createSelector([selectUser], (user) =>user.currentUser);
export const selectToken = createSelector([selectUser], (user) =>user.token);
export const selectIDUser = createSelector([selectUser], (user) =>user.currentUser._id);
