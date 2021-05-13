import {
	addDataInArr,
	deleteDataInArr,
	updateDataInArr,
} from "../../utils/function.utils";
import PostTypes from "./post.types";

const INITIAL_STATE = {
	posts: null,
	currentPosts: null,
};

const PostReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case PostTypes.GET_POST_LIST_SUCCESS:
			return {
				...state,
				posts: payload,
			};
		case PostTypes.CREATE_POST_SUCCESS:
			return {
				...state,
				posts: addDataInArr(state.posts, payload),
			};
		case PostTypes.GET_CURRENT_POST_LIST_SUCCESS:
			return {
				...state,
				currentPosts: payload,
			};
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
				posts: updateDataInArr(state.posts, payload),
			};
		case PostTypes.DELETE_POST_SUCCESS:
			return {
				...state,
				posts: deleteDataInArr(state.posts, payload),
			};
		case PostTypes.UPDATE_CURRENT_POST_SUCCESS:
			return {
				...state,
				currentPosts: updateDataInArr(state.currentPosts, payload),
			};
		case PostTypes.DELETE_CURRENT_SUCCESS:
			return {
				...state,
				currentPosts: deleteDataInArr(state.currentPosts, payload),
			};
		default:
			return state;
	}
};

export default PostReducer;
