import { createSelector } from 'reselect';

export const selectNotifications= (state) => state.notifications;
export const selectNotificationList = createSelector([selectNotifications], (notifications) =>notifications.notifications);
