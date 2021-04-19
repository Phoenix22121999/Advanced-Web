import PostTypes from "./post.types";

const INITIAL_STATE = {
    posts: null,
    currentPost:null,
};

const PostReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case PostTypes.GET_POST_LIST_SUCCESS:
            return {
                ...state,
                posts: payload,
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
        // case UserTypes.UPDATE_USER_SETTINGS_SUCCESS:
        //     return {
        //         ...state,
        //         userSettings: payload
        //     }
        default:
            return state;
    }
};

export default UserReducer;