import { BaseApi } from "./base.api";

// user is admin
export class PostApi extends BaseApi {
    constructor() {
        super('api')
    }

    getAllPost = async ({token,id}) => {
        const rs = await this.get(`/posts/${id}`,undefined,token)
        return rs
    }
    createPost = async ({token,data}) => {
        const rs = await this.post('/posts',data,token)
        return rs
    }
    deletePost = async ({token,id}) => {
        const rs = await this.delete(`/posts/${id}`,undefined,token)
        return rs
    }
    updatePost = async ({token,id,data}) => {
        const rs = await this.put(`/posts/${id}`,data,token)
        return rs
    }
}