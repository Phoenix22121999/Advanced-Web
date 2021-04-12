import { API_URL, METHOD_AXIOS } from "../utils/constant";
import { serializeForm } from "../utils/function.utils";
import { BaseApi } from "./base.api";
const axios = require('axios');

// user is admin
export class UserApi extends BaseApi {
    constructor() {
        super('api')
    }

    getProfile = async () => {
        const rs = await this.get('/user/profile')
        return rs
    }

    logout = async () => {
        const rs = await this.post('/logout')
        return rs
    }

    updateProfile = async (data) => {
        const rs = await this.methodWithFormData('/user/profile', data, METHOD_AXIOS.PUT)

        return rs
    }

    login = async (data) => {
        return axios({
            method: "post",
            url: `${API_URL}/login`,
            data: serializeForm(data),
            withCredentials: true,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
            .then(function (response) {
                //handle success
                return response;
            })
            .catch(function (response) {
                // handle error
                throw response;
            });
    };

    getUserSettings = async () => {
        const rs = await this.get('/user/setting', undefined, METHOD_AXIOS.GET)
        return rs
    }

    updateUserSettings = async (data) => {
        const rs = await this.methodWithFormData('/user/setting', data, METHOD_AXIOS.PUT)
        return rs
    }

}