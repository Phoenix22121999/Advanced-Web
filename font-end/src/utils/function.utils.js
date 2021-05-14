import { API_URL } from "./constant"
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getDateFromTimestamp = (value) => {
    return new Date(value * 1000).toLocaleString()
}

export const checkLogin = ()=>{
    if(cookies.get("token")){
        return true
    }else{
        return false
    }
}

export const getToken = () =>{
    return cookies.get("token")
}

export const turnLinkToEmbed = (rawLink) => {
    if(!rawLink){
        return ""
    }
    let tmp = rawLink.split("/");
    if (tmp.includes("embed")) {
        return rawLink;
    } else if (tmp.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${tmp[tmp.length - 1]}`;
    } else {
        var url = new URL(rawLink);
        var id = url.searchParams.get("v");
        return `https://www.youtube.com/embed/${id}`
    }
};


export const setToken = (value,) =>{
    cookies.set("token",value,{ path: "/" })
}

export const addDataInArr = (data, itemAdd) => {
    if (!data) {
        return [...itemAdd]
    }
    return [...itemAdd,...data ]
}

export const updateDataInArr = (data, itemUpdate) => {
    if (!data) {
        return null
    }
    return data.map(item => {
        if (item._id === itemUpdate._id) {
            return itemUpdate
        }
        return item
    })
}

export const splitLine = (data) => {
    return data.split(/(\r\n|\n|\r)/g).filter((line)=>{
        return line.trim()
    })
}

export const deleteDataInArr = (data, itemDelete) => {
    if (!data) {
        return null;
    }
    return data.filter(item => item._id !== itemDelete._id)
}

export const getLinkImg = (value) => {
    const link = `${API_URL}${value}`
    return link.split(' ').join('%20');
}

export const formatPrice = (value) => {
    let rs = (value*1000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&.');
    rs = (`${rs}`).substr(0, rs.length - 6)
    return `${rs}đ`
}

export const createSlug = () =>{
    // TODO
    return 'slug'
}
/**
 * Get img id array from array obj
 * @param {*} values 
 */
export const getIdsFromArrObject = (values) => {
    if (!values) {
        return []
    }
    return values.map(item => item.id)
}

export const filterDataByType = (data, type) => {
    return data.filter((item) => {
        return item.type === type;
    })
}

export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}