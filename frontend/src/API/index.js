import axios from "axios";
import { Cookies } from "react-cookie";

const baseURL = "http://localhost:3200/api/";

const API = async (url , method = "GET", body = {},headers = {} ) =>{
    const cookies = new Cookies();
    const token = await cookies.get("token");
    if(token){
        headers.authorization = `${token}`
    }
    let res = null;
    let err = null;

    await axios({
        method,
        url,
        baseURL,
        headers,
        data:body,
    }).then((response)=>{
        res = response
    }).catch((error)=>{
        console.log(err);
        err = error;
    }).finally(()=>{

    })
    return {res,err}

}
export default API
