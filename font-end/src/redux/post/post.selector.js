import { createSelector } from 'reselect';

export const selectPosts= (state) => state.posts;
export const selectPostList = createSelector([selectPosts], (posts) =>posts.posts);
export const selectCurrentPostList = createSelector([selectPosts], (posts) =>posts.currentPosts);
