// Components
import { Link } from "react-router-dom";
import Header from "../../Components/Admin/Header"
import MainLogo from "../../Components/Logo/MainLogo";

// Routes
import AdminRoutes from "../../Routes/AdminRoutes"

// Style
import "../../Styles/AdminPanel.css"

const AdminPages = [
    {key: 1, name: "Rooms", href: "/admin/rooms"},
    {key: 2, name: "Users", href: "/admin/users"},

]

const Admin = () => {
    return (
        <div className="admin container-fluid p-0 d-flex vh-100">            
                <div className="sidebar h-100">
                    <div className="head">
                        <Link to="/admin">Admin Page</Link>
                    </div>
                    <div className="section">
                        <div className="content h-100">
                            <Link to="/admin">
                                <MainLogo />
                            </Link>
                            {AdminPages.map((page) => (
                                <div className="page-nav">
                                    <Link to={page.href} key={page.key}>{page.name}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="main h-100">
                    <Header/>
                    <div className="page">
                        <div className="content">
                            <AdminRoutes/>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default Admin;