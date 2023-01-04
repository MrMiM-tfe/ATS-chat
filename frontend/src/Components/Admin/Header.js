import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className="header">
            <nav className="h-100">
                <Link to="/">Home</Link>
                <Link to="/profile">User Profile</Link>
            </nav>
        </header>
    );
}
 
export default Header