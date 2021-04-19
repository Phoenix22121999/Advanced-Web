import api from '../../api/index.api';
import UserTypes from './user.types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const onGetProfile = (tokenId,fCallBack)=> {
    return async (dispatch) => {
        try {
            const result = await api.userApi.getProfile(tokenId)
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
