import { BaseApi } from "./base.api";
// user is admin
export class UserApi extends BaseApi {
    constructor() {
        super('api/users')
    }

    getProfile = async (token) => {
        const rs = await this.post('/loginAccessToken',undefined,token)
        return rs
    }

    loginWithGoogle = async (token) => {
        const rs = await this.post('/login/googleapi',{token})
        return rs
    }

    login = async (data) => {
        const rs = await this.post('/login',data)
        return rs
    }

    register = async (data) => {
        const rs = await this.post('/register',data)
        return rs
    }
    
    updatePassword = async (data,token) => {
        const rs = await this.put('/changePassword',data,token)
        return rs
    }
    updateUser = async (data,token) => {
        const rs = await this.put('/',data,token)
        return rs
    }
}