import { Routes, Route } from "react-router-dom"

// Pages
import Home from "../Pages/Admin/Home"
import Rooms from "../Pages/Admin/Rooms"
import Users from "../Pages/Admin/Users"


const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/rooms" element={<Rooms />}/>
            <Route path="/users" element={<Users />}/>
        </Routes>
    );
}
 
export default AdminRoutes;