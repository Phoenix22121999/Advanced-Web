import api from '../../api/index.api';
import UserTypes from './post.types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const onGetPostsList = (tokenId,fCallBack)=> {
    return async (dispatch) => {
        try {
            const result = await api.postApi.getAllPost(tokenId)
            if (result.success) {
                dispatch({
                    type: UserTypes.GET_PROFILE_SUCCESS,
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

