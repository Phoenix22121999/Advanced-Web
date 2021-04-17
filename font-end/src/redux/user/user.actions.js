import api from '../../api/index.api';
import UserTypes from './user.types';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const onGetProfile = (tokenId,fCallBack)=> {
    return async (dispatch) => {
        try {
            const result = await api.userApi.getProfile(tokenId)
            dispatch({
                type: UserTypes.GET_PROFILE_SUCCESS,
                payload: result
            })

            fCallBack && fCallBack(true)
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

