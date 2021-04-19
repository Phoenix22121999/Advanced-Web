import api from '../../api/index.api';
import PostTypes from './post.types';
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

export const onCreatePost = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {tokenId} = getState().user
            const result = await api.postApi.createPost({token:tokenId,data})
            if (result.success) {
                dispatch({
                    type: PostTypes.CREATE_POST_SUCCESS,
                    payload: result
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


export const onGetPostsList = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {tokenId} = getState().user
            const result = await api.postApi.getAllPost({token:tokenId})
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

