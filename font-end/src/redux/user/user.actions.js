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
                fCallBack && fCallBack(true,result)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onLogin = (data,fCallBack)=> {
    return async (dispatch) => {
        try {
            const result = await api.userApi.login(data)
            if (result.success) {
                dispatch({
                    type: UserTypes.GET_PROFILE_SUCCESS,
                    payload: result
                })
                fCallBack && fCallBack(true,result)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onLoginWithGoogle = (data,fCallBack)=> {
    return async (dispatch) => {
        try {
            const result = await api.userApi.loginWithGoogle(data)
            if (result.success) {
                dispatch({
                    type: UserTypes.GET_PROFILE_SUCCESS,
                    payload: result
                })
                fCallBack && fCallBack(true,result)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}


export const onRegister = (data,fCallBack)=> {
    return async (dispatch) => {
        try {
            const result = await api.userApi.register(data)
            if (result.success) {
                // dispatch({
                //     type: UserTypes.GET_PROFILE_SUCCESS,
                //     payload: result
                // })
                fCallBack && fCallBack(true,result)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onUpdatePassword = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const token = getState().user.token
            // console.log()
            const result = await api.userApi.updatePassword(data,token)
            if (result.success) {
                // dispatch({
                //     type: UserTypes.GET_PROFILE_SUCCESS,
                //     payload: result
                // })
                fCallBack && fCallBack(true,result)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}

export const onUpdateUser = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const token = getState().user.token
            // console.log()
            const result = await api.userApi.updateUser(data,token)
            if (result.success) {
                dispatch({
                    type: UserTypes.UPDATE_PROFILE_SUCCESS,
                    payload: result.data
                })
                fCallBack && fCallBack(true,result)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}