import api from '../../api/index.api';
import NotificationTypes from './notification.types';
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

export const onCreateNotification = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            const result = await api.notificationApi.createNotification({token,data})
            if (result.success) {
                dispatch({
                    type: NotificationTypes.CREATE_NOTIFICATION_SUCCESS,
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

export const onGetNotificationList = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            const result = await api.notificationApi.getAllNotification({token})
            if (result.success) {
                dispatch({
                    type: NotificationTypes.GET_NOTIFICATION_LIST_SUCCESS,
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

export const onGetNotification = (data,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            const result = await api.notificationApi.getNotification({id:data,token})
            if (result.success) {
                // dispatch({
                //     type: NotificationTypes.GET_NOTIFICATION_SUCCESS,
                //     payload: result.data
                // })
                fCallBack && fCallBack(true, result.data)
            }else{
                fCallBack && fCallBack(false, result.message)
            }
        }
        catch (err) {
            fCallBack && fCallBack(false, err.message)
        }
    }
}


export const onUpdateNotify = ({id,...data},fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            // const id = getState().user.currentUser["_id"]
            console.log(';;;;')
            const result = await api.notificationApi.updateNotification({id,token,data:{...data}})
            // console.log(result)
            if (result.success) {
                dispatch({
                    type: NotificationTypes.UPDATE_NOTIFICATION_SUCCESS,
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

export const onDeleteNotify = (id,fCallBack)=> {
    return async (dispatch,getState) => {
        try {
            const {token} = getState().user
            // const id = getState().user.currentUser["_id"]
            const result = await api.notificationApi.deleteNotification({id,token})
            if (result.success) {
                dispatch({
                    type: NotificationTypes.DELETE_NOTIFICATION_SUCCESS,
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
