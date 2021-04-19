import UserTypes from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    tokenGoogle:null,
    tokenId:null,
};

const UserReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case UserTypes.GET_PROFILE_SUCCESS:
            return {
                ...state,
                currentUser: payload.data,
                tokenId:payload.access,
            }
        // case UserTypes.LOGOUT_SUCCESS:
        //     return {
        //         ...state,
        //         currentUser: null,
        //     }
        case UserTypes.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                currentUser: { ...payload },
            }
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
