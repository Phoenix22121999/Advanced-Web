import { BaseApi } from "./base.api";
// user is admin
export class UserApi extends BaseApi {
    constructor() {
        super('api/users')
    }

    getProfile = async (token) => {
        const rs = await this.post('/login/googleapi',{token})
        return rs
    }

    

}