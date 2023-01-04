// Components
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Header from "../../Components/Main/Header"

// Contexts
import { AuthContext } from "../../Contexts/AuthContext";

// Routes
import MainRoutes from "../../Routes/MainRoutes"

const Main = () => {

    const {User} = useContext(AuthContext)

    return (
        <div className="main">
            {(!User && <Navigate to="/auth/login"/>)|| (
                <div>
                    <Header />
                    <div className="content">
                        <MainRoutes />
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default Main;