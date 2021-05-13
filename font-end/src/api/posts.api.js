import { BaseApi } from "./base.api";

// user is admin
export class PostApi extends BaseApi {
    constructor() {
        super('api/posts')
    }

    getAllPost = async ({token}) => {
        const rs = await this.get(`/getAll`,undefined,token)
        return rs
    }

    
    getPost = async ({token,id}) => {
        const rs = await this.get(`/${id}`,undefined,token)
        return rs
    }

    createPost = async ({token,data}) => {
        const rs = await this.post('/',data,token)
        return rs
    }
    deletePost = async ({token,id}) => {
        const rs = await this.delete(`/${id}`,undefined,token)
        return rs
    }
    updatePost = async ({token,id,data}) => {
        const rs = await this.put(`/${id}`,data,token)
        return rs
    }
    getPostByUserId = async ({token,id}) => {
        const rs = await this.get(`/user/${id}`,undefined,token)
        return rs
    }
}