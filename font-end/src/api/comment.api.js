import { BaseApi } from "./base.api";

// user is admin
export class CommentApi extends BaseApi {
    constructor() {
        super('api/posts')
    }

    getComment = async ({token,id}) => {
        const rs = await this.get(`/${id}/comment`,undefined,token)
        return rs
    }
    createComment = async ({token,data,id}) => {
        const rs = await this.post(`/${id}/comment`,data,token)
        return rs
    }
    deleteComment = async ({token,id}) => {
        const rs = await this.delete(`/posts/${id}`,undefined,token)
        return rs
    }
    updateComment = async ({token,id,data}) => {
        const rs = await this.put(`/posts/${id}`,data,token)
        return rs
    }
}