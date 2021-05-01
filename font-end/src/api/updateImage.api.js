import axios from "axios";
import { METHOD_AXIOS } from "../utils/constant";

// user is admin
export class UploadApi {


    methodWithFormData = async ( data, method = METHOD_AXIOS.POST,contentType = "multipart/form-data") => {
        var bodyFormData = new FormData();
        Object.keys(data).map(item => {
            bodyFormData.append(item, data[item]);
            return null
        })
        bodyFormData.append("key","f74da55ae5e3abbe8f8b431f2523f045")
        const config = {
            method,
            url: `https://api.imgbb.com/1/upload`,
            data: bodyFormData,
            headers: {
                "Content-Type": contentType,
            },
            // withCredentials: true,
        }

        return axios(config)
            .then(function (response) {
                return response;
            })
            .catch(function (response) {
                throw response
            });
    };

}