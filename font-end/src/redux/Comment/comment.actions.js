import api from '../../api/index.api';


export const onCreateComment = ({id,data},fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            // const id = getState().user.currentUser["_id"]
            const result = await api.commentApi.createComment({id,token,data})
            console.log(result)
            if (result.success) {
                // dispatch({
                //     type: PostTypes.DELETE_POST_SUCCESS,
                //     payload: result.data
                // })
                fCallBack && fCallBack(true,result.data)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onGetComment = ({id},fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            // const id = getState().user.currentUser["_id"]
            const result = await api.commentApi.getComment({id,token})
            if (result.success) {
                // dispatch({
                //     type: PostTypes.DELETE_POST_SUCCESS,
                //     payload: result.data
                // })
                fCallBack && fCallBack(true,result.data)
                return result.data
            }else{
                fCallBack && fCallBack(false, result.message)
                return result.message

            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}



