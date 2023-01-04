import { Routes, Route } from "react-router-dom"

// Pages
// import Home from "../Pages/Home"
// import About from "../Pages/About"
// import Shop from "../Pages/Shop";
// import ProductDetails from "../Pages/ProductDetails";
import Rooms from "../Pages/Rooms";
import NewRoom from "../Pages/NewRoom";
import Profile from "../Pages/Profile";
import Test from "../Pages/Test";
// import Signup from "../Pages/Auth/Signup";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/test" element={<Test/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/new-room" element={<NewRoom/>} />
            <Route path="/" element={<Rooms/>} />
        </Routes>
    );
}

export default MainRoutes