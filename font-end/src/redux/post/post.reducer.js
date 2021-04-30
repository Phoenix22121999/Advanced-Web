import { addDataInArr, updateDataInArr } from "../../utils/function.utils";
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
        case PostTypes.CREATE_POST_SUCCESS:
            return{
                ...state,
                posts: addDataInArr(state.posts,payload)
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
        case PostTypes.UPDATE_POST_SUCCESS:
            return {
                ...state,
                posts: updateDataInArr(state.posts,payload)
            }
        default:
            return state;
    }
};

export default PostReducer;
