import api from '../../api/index.api';
import UserTypes from './user.types';
// import Cookies from 'universal-cookie';

export const onGetProfile = (token,fCallBack)=> {
    return async (dispatch) => {
        try {
            const result = await api.userApi.getProfile(token)
            if (result.success) {
                dispatch({
                    type: UserTypes.GET_PROFILE_SUCCESS,
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

