import { Routes, Route } from "react-router-dom"

// Pages
import Login from "../Pages/Auth/Login";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
        </Routes>
    );
}

export default AuthRoutes