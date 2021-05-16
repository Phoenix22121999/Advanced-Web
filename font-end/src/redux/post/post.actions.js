import api from '../../api/index.api';
import PostTypes from './post.types';
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

export const onCreatePost = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            const result = await api.postApi.createPost({token,data})
            if (result.success) {
                dispatch({
                    type: PostTypes.CREATE_POST_SUCCESS,
                    payload: result.post
                })
                fCallBack && fCallBack(true)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onGetPostList = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            const result = await api.postApi.getAllPost({token})
            if (result.success) {
                dispatch({
                    type: PostTypes.GET_POST_LIST_SUCCESS,
                    payload: result.data
                })
                fCallBack && fCallBack(true)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onGetPosts = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        // console.log("data")
        try {
            const {token} = getState().user
            const result = await api.postApi.getPost({id:data,token})
            if (result.success) {
                dispatch({
                    type: PostTypes.GET_POST_LIST_SUCCESS,
                    payload: result.data
                })
                fCallBack && fCallBack(true)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onGetPostByUserId = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        // console.log("data")
        try {
            const {token} = getState().user
            const result = await api.postApi.getPostByUserId({id:data,token})
            if (result.success) {
                dispatch({
                    type: PostTypes.GET_CURRENT_POST_LIST_SUCCESS,
                    payload: result.data
                })
                fCallBack && fCallBack(true)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onUpdatePost = ({id,...data},fCallBack,isCurrent)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            // const id = getState().user.currentUser["_id"]
            const result = await api.postApi.updatePost({id,token,data:{...data}})
            // console.log(result)
            if (result.success) {
                dispatch({
                    type: isCurrent?PostTypes.UPDATE_CURRENT_POST_SUCCESS: PostTypes.UPDATE_POST_SUCCESS,
                    payload: result.data
                })
                fCallBack && fCallBack(true)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onDeletePost = (id,fCallBack,isCurrent)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            // const id = getState().user.currentUser["_id"]
            const result = await api.postApi.deletePost({id,token})
            if (result.success) {
                dispatch({
                    type: isCurrent?PostTypes.DELETE_CURRENT_SUCCESS:PostTypes.DELETE_POST_SUCCESS,
                    payload: result.data
                })
                fCallBack && fCallBack(true)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}
