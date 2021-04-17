import { API_URL, METHOD_AXIOS } from "../utils/constant";
import { serializeForm } from "../utils/function.utils";
import { BaseApi } from "./base.api";
const axios = require('axios');

// user is admin
export class UserApi extends BaseApi {
    constructor() {
        super('')
    }

    getProfile = async (token) => {
        const rs = await this.post('login',undefined,token)
        return rs
    }

    

}