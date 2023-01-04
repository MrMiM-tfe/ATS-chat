import io from 'socket.io-client';
import { Cookies } from "react-cookie";

const Socket = (url = "") => {

    // get token from cookie
    const cookies = new Cookies();
    const token = cookies.get("token");
        
    const socket = io(`localhost:3200/${url}`, {
      query:{
        token: token
      }
    })

    return socket
}

export default Socket