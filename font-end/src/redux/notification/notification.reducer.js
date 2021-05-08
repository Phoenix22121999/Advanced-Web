import { addDataInArr, deleteDataInArr, updateDataInArr } from "../../utils/function.utils";
import NotificationTypes from "./notification.types";

const INITIAL_STATE = {
    notifications: null,
    currentNotification:null,
};

const PostReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case NotificationTypes.GET_NOTIFICATION_LIST_SUCCESS:
            return {
                ...state,
                notifications: payload,
            }
        case NotificationTypes.CREATE_NOTIFICATION_SUCCESS:
            return{
                ...state,
                notifications: addDataInArr(state.notifications,payload.data)
            }
        // case UserTypes.LOGOUT_SUCCESS:
        //     return {
        //         ...state,
        //         currentUser: null,
        //     }
        // case PostTypes.CREATE_POST_SUCCESS:
        //     return {
        //         ...state,
        //         currentUser: { ...payload },
        //     }
        // case UserTypes.GET_USER_SETTINGS_SUCCESS:
        case NotificationTypes.UPDATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: updateDataInArr(state.notifications,payload)
            }
        case NotificationTypes.DELETE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                notifications: deleteDataInArr(state.notifications,payload)
            }
        default:
            return state;
    }
};

export default PostReducer;
