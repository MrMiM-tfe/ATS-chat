import { createContext, useState, useContext } from "react";
import { Cookies } from "react-cookie";

import API from "../API"

// create context
const AuthContext = createContext()

// create authProvider 
const AuthProvider = ({ children }) => {

    const curentUser = JSON.parse(localStorage.getItem("user"))

    // states
    const [isSignup,setIsSignup]=useState(false)
    const [User, setUser] = useState(curentUser);
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);

    const [IsAdmin, setIsAdmin] = useState(false)

    const adminCheck = async () => {
      const {res, err} = await API("auth/getuser", "get")

      if (res?.data.user.role === "admin") {
        setIsAdmin(true)
      }else {
        setIsAdmin(false)
      }
    }
  
    // login method 
    const login = async (username, password, redirectPath) => {
        setPending(true);
        // create data object
        const data = {
          username,
          password,
        };
  
        // request to API 
        const { res, err } = await API("auth/login", "post", data);
  
        // check if response
        if (res) {
          console.log(res.data);
          
          if (res.data.user.role === "admin") {
            setIsAdmin(true)
          }

          localStorage.setItem("user", JSON.stringify(res.data.user))
          
          // set token in cookies
          const cookies = new Cookies();
          cookies.set("token", res.data.token.token);
          
          setError(null);
          setUser(res.data.user);
        }
        if (err) {
          setUser(null);
          setError(err);
        }
        setPending(false);
    };
    
    // signup method
    const signup = async (data) => {
      setPending(true);
  
      // request to API
      const { res, err } = await API("auth/register", "post", data);
  
      // check if response
      if (res) {
        setIsSignup(true)
        setUser(res.data.user)

        if (User.role === "admin") {
          setIsAdmin(true)
        }

        localStorage.setItem("user", JSON.stringify(User))
        // set token in cookies
        const cookies = new Cookies();
        cookies.set("token", res.data.token);
      }
      if (err) {
        setUser(null);
        setError(err);
      }
      setPending(false);
    };
  
    // logout method
    const logout = async () => {
      setPending(true);
  
      // get token from cookie
      const cookies = new Cookies();
      const token = await cookies.get("token");
  
      // check if user is loged in befor
      if(token){
  
        // delete token from cookie
        cookies.set("token", "", { expires: new Date() });
        
        localStorage.removeItem("user")

        setUser(null);
        setError(null);
      }
      if(!token){
        localStorage.removeItem("user")
        console.log("you are not loged in");
      }
      setPending(false);
    };
    
    const value = {
      IsAdmin,
      User,
      error,
      pending,
      isSignup,
      adminCheck,
      login,
      signup,
      logout
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  const useAuth = () => useContext(AuthContext);
  export { AuthProvider, useAuth, AuthContext };
  