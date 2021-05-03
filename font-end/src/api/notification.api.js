import { BaseApi } from "./base.api";

// user is admin
export class NotificationApi extends BaseApi {
    constructor() {
        super('api/notify')
    }

    getAllNotification = async ({token}) => {
        const rs = await this.get(`/all`,undefined,token)
        return rs
    }
    
    getNotification = async ({token,id}) => {
        const rs = await this.get(`/${id}`,undefined,token)
        return rs
    }

    createNotification = async ({token,data}) => {
        const rs = await this.post('/',data,token)
        return rs
    }
    deleteNotification = async ({token,id}) => {
        const rs = await this.delete(`/${id}`,undefined,token)
        return rs
    }
    updateNotification = async ({token,id,data}) => {
        const rs = await this.put(`/${id}`,data,token)
        return rs
    }
}