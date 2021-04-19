import { API_URL, METHOD_AXIOS } from "../utils/constant";
import { serializeForm } from "../utils/function.utils";
import { BaseApi } from "./base.api";
const axios = require('axios');

// user is admin
export class PostApi extends BaseApi {
    constructor() {
        super('api')
    }

    getAllPost = async (token) => {
        const rs = await this.get('/post',undefined,token)
        return rs
    }
    createPost = async ({token,data}) => {
        const rs = await this.post('/post',data,token)
        return rs
    }
    deletePost = async ({token,id}) => {
        const rs = await this.delete(`/post/${id}`,undefined,token)
        return rs
    }
    updatePost = async ({token,id,data}) => {
        const rs = await this.put(`/post/${id}`,data,token)
        return rs
    }
}